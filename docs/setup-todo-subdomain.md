# 配置 todo.bunnyuniverse.com 子域名

## 📋 需要完成的步骤

### Step 1: Cloudflare DNS 配置

使用 Cloudflare API 添加 CNAME 记录：

```bash
# 设置环境变量（从 /Volumes/Lexar/oneweekoneproject/bunnyuniverse/.env 读取）
CF_EMAIL="zhengxiangwei27@gmail.com"
CF_KEY="57f21a909d2f60f03af61dda70c9b52758ac4"
ZONE_ID="243268114713d40922bea31f97cc3995"

# 添加 CNAME 记录
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "X-Auth-Email: $CF_EMAIL" \
  -H "X-Auth-Key: $CF_KEY" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "CNAME",
    "name": "todo",
    "content": "cname.vercel-dns.com",
    "ttl": 1,
    "proxied": false
  }'
```

**或者手动配置**（Cloudflare Dashboard）：
1. 登录 https://dash.cloudflare.com
2. 选择 `bunnyuniverse.com` 域名
3. 进入 DNS → Records
4. 点击 "Add record"
5. 填写：
   - Type: `CNAME`
   - Name: `todo`
   - Target: `cname.vercel-dns.com`
   - Proxy status: DNS only（灰色云朵，不要橙色）
   - TTL: Auto
6. 保存

---

### Step 2: Vercel 域名配置

**方法 1: 使用 Vercel CLI（推荐）**

```bash
cd luna-personal-site

# 部署最新代码到生产环境
vercel --prod

# 添加域名到项目
vercel domains add todo.bunnyuniverse.com

# 记下输出的 deployment URL（格式：luna-personal-site-xxxxx.vercel.app）

# 绑定域名到部署
vercel alias set <deployment-url> todo.bunnyuniverse.com
```

**方法 2: 使用 Vercel Dashboard**

1. 登录 https://vercel.com
2. 进入 `luna-personal-site` 项目
3. 点击 Settings → Domains
4. 点击 "Add"
5. 输入 `todo.bunnyuniverse.com`
6. 点击 "Add"
7. Vercel 会自动验证 DNS 并签发 SSL 证书（1-2 分钟）

---

### Step 3: 验证配置

#### 3.1 检查 DNS 解析

```bash
# 检查 CNAME 记录
dig todo.bunnyuniverse.com CNAME +short
# 应该返回: cname.vercel-dns.com

# 检查 A 记录（Vercel IP）
dig todo.bunnyuniverse.com +short
# 应该返回 Vercel 的 IP 地址（类似 76.76.21.xxx）
```

#### 3.2 访问网站

```bash
# 等待 DNS 生效（通常 1-5 分钟）
curl -I https://todo.bunnyuniverse.com
# 应该返回 200 OK

# 或者直接在浏览器访问
open https://todo.bunnyuniverse.com/today
```

---

## 🧪 本地测试（不需要配置 DNS）

在配置 DNS 之前，可以先在本地测试：

```bash
cd luna-personal-site
npm run dev
```

然后访问：
```
http://localhost:5173/?persona=todo
http://localhost:5173/today?persona=todo
```

---

## 📊 配置完成后的访问方式

### 生产环境（需要 DNS 配置）
```
https://todo.bunnyuniverse.com/
https://todo.bunnyuniverse.com/today
https://todo.bunnyuniverse.com/focus
https://todo.bunnyuniverse.com/review
```

### 本地开发
```
http://localhost:5173/?persona=todo
http://localhost:5173/today?persona=todo
```

### Vercel 预览（分支部署）
```
https://<preview-url>/?persona=todo
https://<preview-url>/today?persona=todo
```

---

## ⚠️ 常见问题

### Q1: DNS 配置后访问 404？
**A**: 等待 DNS 生效（最多 10 分钟）。使用 `dig todo.bunnyuniverse.com` 检查解析是否正确。

### Q2: SSL 证书错误？
**A**: Vercel 自动签发 SSL 需要 1-2 分钟。如果超过 5 分钟还有问题，检查 Cloudflare 的 Proxy 状态是否为"DNS only"（灰色云朵）。

### Q3: 页面显示但样式错乱？
**A**: 清除浏览器缓存，或使用无痕模式访问。

### Q4: 想要临时测试但不想配置 DNS？
**A**: 使用 Vercel 预览 URL + `?persona=todo` 参数，或者在本地开发环境测试。

---

## 🔄 回滚操作（如果需要）

### 删除 DNS 记录

```bash
# 1. 先获取记录 ID
RECORD_ID=$(curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?name=todo.bunnyuniverse.com" \
  -H "X-Auth-Email: $CF_EMAIL" \
  -H "X-Auth-Key: $CF_KEY" | jq -r '.result[0].id')

# 2. 删除记录
curl -X DELETE "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
  -H "X-Auth-Email: $CF_EMAIL" \
  -H "X-Auth-Key: $CF_KEY"
```

### 从 Vercel 删除域名

```bash
vercel domains rm todo.bunnyuniverse.com
```

或在 Vercel Dashboard → Settings → Domains 中手动删除。
