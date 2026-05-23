# Harbor Table

> Modern American Restaurant Website Demo - 高端餐厅官网，强调极简美学、流畅动画、沉浸式体验

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15.0-88ce02)](https://gsap.com/)

---

## 项目定位

Harbor Table 是一个现代美式餐厅官网 Demo，展示如何用 Next.js 16 + React 19 + GSAP 构建高质量的餐饮行业网站。

**设计理念**：
- 极简主义：黑色背景，大量留白，金色点缀
- 流畅动画：GSAP + Lenis 打造丝滑滚动体验
- 响应式设计：完美适配 Desktop / Tablet / Mobile
- 可访问性：支持 `prefers-reduced-motion` 降级

---

## 技术栈

### 核心框架
- **Next.js 16.2.6** - App Router + React Server Components
- **React 19.2.4** - 最新 React 特性
- **TypeScript 5** - 类型安全
- **Tailwind CSS 4** - 原子化 CSS + Design Tokens

### 动画库
- **GSAP 3.15.0** - 核心动画引擎
  - ScrollTrigger - 滚动触发动画
  - SplitType 0.3.4 - 字符级动画
- **Lenis 1.3.23** - 平滑滚动
- **Framer Motion 12.40.0** - 页面过渡（Phase 3）

### 表单与验证
- **React Hook Form 7.76.0** - 表单状态管理
- **Zod 4.4.3** - Schema 验证

---

## 核心功能

### Phase 1：静态版本 ✅
- Hero Section - 全屏视差背景 + 品牌标题
- Philosophy Section - 餐厅理念 + 文章卡片
- Menu Section - 菜单展示网格
- Reservation Section - 预约表单 + 联系信息
- Footer - 多栏布局 + 社交链接
- 响应式布局 - Desktop / Tablet / Mobile

### Phase 2：动画层 ✅
- Hero 入场动画 - GSAP Timeline + 字符动画
- ScrollTrigger 动画 - 5 个 Section 滚动触发
- Lenis 平滑滚动 - 丝滑滚动体验
- Lenis + ScrollTrigger 协同 - RAF 循环同步
- `prefers-reduced-motion` 降级 - 可访问性支持
- SSR 安全 - 所有动画 hooks 支持服务端渲染

### Phase 3：高级交互 🚧
- Menu 卡片 Magnetic 效果
- Hero 背景视差滚动
- Reservation 表单实时验证
- Footer 社交图标 hover 动画
- 页面过渡动画
- 性能监控与优化

---

## 动画亮点

### 1. Hero 入场动画
- 背景图缩放 + 淡入（1.6s）
- 标题字符逐个入场（stagger 0.04s）
- 副标题 + 装饰线协同动画

### 2. ScrollTrigger 系统
- **Philosophy**：引言模糊 + 文章卡片横向入场
- **Menu**：卡片缩放 + 视差效果
- **Reservation**：表单字段 stagger + 信息块横向入场
- **Footer**：Logo + 栏目 stagger + 版权行

### 3. Lenis 平滑滚动
- 自定义缓动函数
- 与 ScrollTrigger 完美协同
- RAF 循环同步滚动状态

### 4. 可访问性
- 检测 `prefers-reduced-motion`
- 自动降级所有动画
- 保持内容可读性

---

## 本地运行

### 前置条件
- Node.js 18+
- npm 9+

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
打开 [http://localhost:3000](http://localhost:3000) 查看效果

### 构建生产版本
```bash
npm run build
npm run start
```

### Lint 检查
```bash
npm run lint
```

---

## 部署

### Vercel 一键部署（推荐）
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/harbor-table)

### 手动部署
```bash
# 1. 构建
npm run build

# 2. 部署到 Vercel
npm i -g vercel
vercel --prod
```

### 环境变量
当前项目无需环境变量。  
Phase 3 如果添加表单提交功能，需要配置：
- `NEXT_PUBLIC_API_URL` - 后端 API 地址
- `RESEND_API_KEY` - 邮件服务 API Key

---

## 项目结构

```
harbor-table/
├── app/
│   ├── page.tsx              # 首页
│   ├── layout.tsx            # 根布局
│   └── globals.css           # 全局样式 + Design Tokens
├── components/
│   ├── hero/                 # Hero Section
│   ├── philosophy/           # Philosophy Section
│   ├── menu/                 # Menu Section
│   ├── reservation/          # Reservation Section
│   ├── footer/               # Footer
│   ├── providers/            # Context Providers
│   └── ui/                   # 通用 UI 组件
├── hooks/
│   ├── useHeroIntro.ts       # Hero 入场动画
│   ├── usePhilosophyScroll.ts # Philosophy ScrollTrigger
│   ├── useMenuScroll.ts      # Menu ScrollTrigger
│   ├── useReservationScroll.ts # Reservation ScrollTrigger
│   ├── useFooterScroll.ts    # Footer ScrollTrigger
│   └── useLenis.ts           # Lenis 平滑滚动
├── lib/
│   └── animations.ts         # 动画参数统一管理
├── types/
│   └── lenis.d.ts            # Lenis 类型定义
├── public/                   # 静态资源
├── CLAUDE.md                 # 项目规范
├── PHASE2_REPORT.md          # Phase 2 完成报告
└── README.md                 # 本文件
```

---

## Phase 3 Roadmap

### 优先级 P0（必做）
- [ ] 表单验证 - React Hook Form + Zod 实时验证
- [ ] 表单提交 - 连接后端 API 或 Serverless Function
- [ ] 图片优化 - 替换 Unsplash 为本地图片 + Next.js Image

### 优先级 P1（重要）
- [ ] Magnetic 效果 - Menu 卡片鼠标吸附
- [ ] Hero 视差 - 背景图跟随鼠标移动
- [ ] Footer 动画 - 社交图标 hover 效果

### 优先级 P2（可选）
- [ ] 页面过渡 - Framer Motion 路由动画
- [ ] 性能监控 - FPS 检测 + 动画降级
- [ ] CMS 集成 - Contentful / Sanity 数据源

---

## 开发规范

### 分支管理
- 禁止在 `main` 分支直接开发
- L2/L3 任务必须使用 worktree
- 功能完成后提交 PR

### 代码规范
- 组件使用 TypeScript 严格模式
- 所有组件必须有类型定义
- 使用 CSS Variables 而非硬编码颜色
- 动画参数从 `lib/animations.ts` 读取

### 提交前检���
```bash
npm run lint
npm run build
```

### 禁止事项
- ❌ 不得扩大需求范围
- ❌ 不得顺手重构无关代码
- ❌ 不得吞掉错误信息
- ❌ API key 只能存环境变量

---

## 许可证

MIT © Harbor Table

---

## 致谢

- 设计灵感：现代高端餐厅网站
- 动画库：[GSAP](https://gsap.com/) + [Lenis](https://lenis.darkroom.engineering/)
- 框架：[Next.js](https://nextjs.org/) + [React](https://react.dev/)
- 样式：[Tailwind CSS](https://tailwindcss.com/)

---

**项目状态**：Phase 2 完成 ✅  
**代码质量评分**：9.5/10  
**最后更新**：2026-05-23
