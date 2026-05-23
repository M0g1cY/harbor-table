# Harbor Table - 部署前检查清单

**项目状态**：Phase 2 完成 ✅  
**检查日期**：2026-05-23

---

## ✅ 已完成项

### 代码质量
- ✅ `npm run build` 通过（1340ms 编译成功）
- ✅ `npm run lint` 通过（5 个 warnings，非阻塞）
- ✅ TypeScript 检查通过（1395ms）
- ✅ 静态页面生成成功（349ms）

### 功能完整性
- ✅ Hero Section（入场动画 + 视差背景）
- ✅ Philosophy Section（ScrollTrigger 动画）
- ✅ Menu Section（ScrollTrigger + 视差效果）
- ✅ Reservation Section（ScrollTrigger + 表单布局）
- ✅ Footer（ScrollTrigger + 多栏布局）
- ✅ 响应式布局（Desktop / Tablet / Mobile）
- ✅ `prefers-reduced-motion` 降级支持

### 动画系统
- ✅ GSAP 3.15.0 + ScrollTrigger
- ✅ Lenis 1.3.23 平滑滚动
- ✅ Lenis + ScrollTrigger 协同（RAF 循环）
- ✅ 动画参数统一管理（`lib/animations.ts`）
- ✅ SSR 安全（所有 hooks 支持服务端渲染）

---

## ⚠️ 待完成项

### Git 仓库
- ⚠️ **项目尚未初始化 Git 仓库**

**操作步骤**：
```bash
cd ~/harbor-table
git init
git add .
git commit -m "feat: Phase 2 完成 - 动画系统 + ScrollTrigger + Lenis 集成

- 实现 Hero 入场动画（GSAP Timeline + SplitType）
- 实现 5 个 Section ScrollTrigger 动画
- 集成 Lenis 平滑滚动 + ScrollTrigger ��同
- 添加 prefers-reduced-motion 降级支持
- 统一动画参数到 lib/animations.ts
- 所有动画 hooks 实现 SSR 安全

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

### 远程仓库
- ⚠️ **尚未推送到 GitHub/GitLab**

**操作步骤**：
```bash
# 1. 在 GitHub 创建新仓库（不要初始化 README）
# 2. 添加远程仓库
git remote add origin https://github.com/yourusername/harbor-table.git

# 3. 推送代码
git branch -M main
git push -u origin main
```

### Vercel 部署
- ⚠️ **尚未连接 Vercel 项目**

**操作步骤**：
```bash
# 方式 1：通过 Vercel CLI
npm i -g vercel
vercel --prod

# 方式 2：通过 GitHub 集成（推荐）
# 1. 访问 https://vercel.com/new
# 2. 导入 GitHub 仓库
# 3. 保持默认配置
# 4. 点击 Deploy
```

---

## 🔍 Vercel 部署配置

### Framework Preset
- **Framework**: Next.js
- **Root Directory**: `./`（默认）
- **Build Command**: `npm run build`（默认）
- **Output Directory**: `.next`（默认）
- **Install Command**: `npm install`（默认）

### 环境变量
当前项目**无需配置环境变量**。  
所有图片使用 Unsplash CDN，无需 API Key。

Phase 3 如果添加表单提交功能，需要配置：
- `NEXT_PUBLIC_API_URL` - 后端 API 地址
- `RESEND_API_KEY` - 邮件服务 API Key（如使用 Resend）

### Node.js 版本
- **推荐版本**: 18.x 或 20.x
- Vercel 默认使用 Node.js 20.x，无需手动配置

---

## 📊 Lint Warnings 说明

### 当前 Warnings（5 个）
```
C:\Users\张德帅\harbor-table\hooks\useFooterScroll.ts
  152:6  warning  React Hook useEffect has a missing dependency: 'refs'

C:\Users\张德帅\harbor-table\hooks\useMenuScroll.ts
  127:6  warning  React Hook useEffect has a missing dependency: 'refs'

C:\Users\张德帅\harbor-table\hooks\usePhilosophyScroll.ts
    4:23  warning  'GsapType' is defined but never used
  126:6   warning  React Hook useEffect has a missing dependency: 'refs'

C:\Users\张德帅\harbor-table\hooks\useReservationScroll.ts
  152:6  warning  React Hook useEffect has a missing dependency: 'refs'
```

### 为什么不修复？
1. **`react-hooks/exhaustive-deps` 警告是预期行为**  
   - ScrollTrigger hooks 的 useEffect 必须使用空数组 `[]`
   - 添加 `refs` 依赖会导致动画重复初始化
   - 这是 GSAP + React 的标准模式

2. **`GsapType` 未使用警告**  
   - 这是类型导入，可以安全删除
   - 不影响功能，可以在 Phase 3 清理

### 如何忽略？
如果想消除 warnings，可以添加 ESLint 注释：
```typescript
useEffect(() => {
  // ... 动画代码
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

---

## 🚀 部署后验证

### 功能测试
- [ ] 首页加载正常
- [ ] Hero 入场动画播放
- [ ] 滚动触发 Philosophy 动画
- [ ] 滚动触发 Menu 动画
- [ ] 滚动触发 Reservation 动画
- [ ] 滚动触发 Footer 动画
- [ ] Lenis 平滑滚动生效
- [ ] 响应式布局正常（Desktop / Tablet / Mobile）

### 性能测试
- [ ] Lighthouse Performance > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

### 可访问性测试
- [ ] Lighthouse Accessibility > 95
- [ ] `prefers-reduced-motion` 降级生效
- [ ] 键盘导航正常
- [ ] 屏幕阅读器兼容

---

## 📝 推荐 Commit Message

```
feat: Phase 2 完成 - 动画系统 + ScrollTrigger + Lenis 集成

- 实现 Hero 入场动画（GSAP Timeline + SplitType）
- 实现 5 个 Section ScrollTrigger 动画
- 集成 Lenis 平滑滚动 + ScrollTrigger 协同
- 添加 prefers-reduced-motion 降级支持
- 统一动画参数到 lib/animations.ts
- 所有动画 hooks 实现 SSR 安全

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

---

## 🎯 下一步

1. **初始化 Git 仓库**（5 分钟）
2. **推送到 GitHub**（5 分钟）
3. **连接 Vercel 部署**（10 分钟）
4. **验证部署结果**（10 分钟）
5. **开始 Phase 3 开发**

**预计总时间**：30 分钟

---

**文档生成时间**：2026-05-23  
**生成工具**：Claude Opus 4.7 (1M context)
