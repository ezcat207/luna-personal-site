# 修复 Vercel 预览环境登录跳转问题

## 问题描述
在 Vercel 预览环境登录后，会自动跳转到 `https://log.bunnyuniverse.com/#`，而不是停留在预览 URL。

## 原因
Supabase 的 Redirect URLs 配置中只允许生产域名，没有允许 Vercel 预览域名。

## 解决方案

### 方法 1: 添加通配符域名到 Supabase（推荐）

1. 登录 Supabase Dashboard
2. 进入你的项目 → Authentication → URL Configuration
3. 在 "Redirect URLs" 中添加：
   ```
   https://*.vercel.app/*
   https://luna-personal-site-*.vercel.app/*
   ```

4. 保存设置

### 方法 2: 使用本地开发环境测试

```bash
cd luna-personal-site
npm run dev
```

然后访问：
```
http://localhost:5173/?persona=log
http://localhost:5173/todo/today?persona=log
```

本地环境的 redirect URL 应该已经配置为 `http://localhost:5173/*`

### 方法 3: 直接使用生产域名测试（需要先配置）

在 Vercel Dashboard 中：
1. 项目设置 → Domains
2. 添加 `log.bunnyuniverse.com`
3. 等待 DNS 生效（几分钟）

然后访问：
```
https://log.bunnyuniverse.com/todo/today
```

## 临时解决方案（跳过登录测试）

如果只想测试 UI，可以：
1. 先在生产环境登录一次（获取 session）
2. 然后访问预览 URL
3. Session 会自动携带过来

或者等待合并到 main 分支后，直接在生产环境测试。
