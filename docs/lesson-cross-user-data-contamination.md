# Lesson Learned: Cross-User Data Contamination in Supabase

**日期**: 2026-06-20  
**影响范围**: `log.bunnyuniverse.com` — luna_daily_logs / luna_log_tasks  
**严重程度**: 高（用户数据互相可见/写入）

---

## 发生了什么

Ruoyu 登录 log 页面后，看到的任务数量不对：显示 10/21（其中 11 个是 Leon 的任务）。  
根本原因是 Leon 在登录过渡期间，把自己的任务写进了 Ruoyu 的 log。  
兔子表情因此显示 ~50% 进度，而不是应有的 100% 超级星星。

---

## Root Cause（两个 bug 叠加）

### Bug 1 — 数据库没有有效 RLS

Supabase 建表时会自动生成 `open read/write` 策略：

```sql
-- 这个策略让所有人可读写所有行
CREATE POLICY "open read luna_daily_logs" ON luna_daily_logs
  FOR SELECT TO public USING (true);  -- ← qual: true = 全公开
```

**关键陷阱**：PostgreSQL 的 RLS 策略是 OR 逻辑。只要有一个策略允许，行就可访问。  
即使后来加了严格的 per-user 策略，这个 `open read` 也会让所有限制失效。

### Bug 2 — 客户端 `userId = null` 时没有过滤

```typescript
// 旧代码（有问题）
let query = supabase.from('luna_daily_logs').select('*').eq('log_date', date);
if (userId) query = query.eq('user_id', userId);
// ↑ userId 是 null 时，没加任何 user_id 过滤！
```

再加上 `.maybeSingle()` 在多行时静默返回 null，导致：

```
多行存在 → maybeSingle() 返回 null → 代码以为"没有记录" → 创建新 log → 数据越来越乱
```

### 事故还原时间线

```
1. Leon 打开 log 页面
2. 浏览器正在加载 Google 登录状态（user = null，authLoading = false）
3. loadDay(date, null) 被调用
4. 查询：SELECT * FROM luna_daily_logs WHERE log_date = '2026-06-20'
   → 没有 user_id 过滤 + 没有 RLS → 抓到了 Ruoyu 的 log
5. Leon 在这个 log 里添加了自己的任务（创业/打工/身体等）
6. 登录完成，Leon 的真实账号生成了一个空 log
7. 结果：Leon 的 11 个任务混进了 Ruoyu 的 log
```

---

## 修复方案（三层防护）

### 层 1 — 数据库：删除 open 策略，加正确 RLS

```sql
-- 删掉旧的全公开策略
DROP POLICY IF EXISTS "open read luna_daily_logs" ON luna_daily_logs;
DROP POLICY IF EXISTS "open insert luna_daily_logs" ON luna_daily_logs;
DROP POLICY IF EXISTS "open update luna_daily_logs" ON luna_daily_logs;
-- (同样处理 luna_log_tasks)

-- 加正确的 per-user 策略
CREATE POLICY "users_own_logs_select" ON luna_daily_logs
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "anon_logs_select" ON luna_daily_logs
  FOR SELECT TO anon
  USING (user_id IS NULL);  -- 未登录只能看 user_id=null 的行
```

见迁移文件：`supabase/migrations/003_add_rls_policies.sql` 和 `004_remove_open_policies.sql`

### 层 2 — 客户端查询：明确过滤 null

```typescript
// 修复后
let query = supabase.from('luna_daily_logs').select('*').eq('log_date', date);
if (userId) {
  query = query.eq('user_id', userId);       // 登录用户：只看自己的
} else {
  query = query.is('user_id', null);         // 未登录：只看 user_id=null 的行
}

// 用 .limit(1) 替换 .maybeSingle()，避免多行时静默失败
const { data: logRows } = await query.limit(1);
```

### 层 3 — 客户端校验：拿到 log 后验证所有权

```typescript
if (logRow) {
  const rowOwner = logRow.user_id ?? null;
  if (rowOwner !== (userId ?? null)) {
    // 即使数据库返回了错误的行，客户端也拒绝使用
    console.warn('[loadDay] user_id mismatch – discarding row');
    logRow = null;
  }
}
```

### 数据修复

June 20 已被污染的 11 个任务（Leon 的创业/打工等）通过 SQL 迁移回了 Leon 自己的 log：

```sql
UPDATE luna_log_tasks
SET log_id = '<leon_log_id>'
WHERE log_id = '<ruoyu_log_id>'
  AND subject IN ('其他', '创业', '压缩预测', '打工', '身体');
```

---

## 经验总结

| 教训 | 行动 |
|------|------|
| Supabase 建表后**必须立即删除 open 策略**，加 per-user RLS | 所有新表建立后先跑 003/004 migration 模板 |
| PostgreSQL RLS 是 OR 逻辑，有一个 `USING (true)` 的策略就全毁 | 加新策略前先 `SELECT * FROM pg_policies` 检查有无遗留 open 策略 |
| 客户端 `userId = null` 时必须显式过滤 `.is('user_id', null)` | 所有 Supabase 查询都要处理 null user 场景 |
| `.maybeSingle()` 在多行时静默返回 null，容易误触发"创建新行"逻辑 | 改用 `.limit(1)` 取第一行 |
| auth 加载是异步的，`user` 在加载完成前可能短暂为 null | 始终等 `authLoading = false` 再发请求；加 user_id 二次校验 |
