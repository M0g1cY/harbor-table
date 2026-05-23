# Harbor Table — Project Spec

> 产品 / 设计 / 功能规格文档
> 与 [CLAUDE.md](./CLAUDE.md) 互补:本文档定义"做什么",CLAUDE.md 定义"怎么做"。
> 最后更新:2026-05-23

---

## 1. 项目定位

Harbor Table 是一个 **Modern American Restaurant** 官网 Demo,用于展示如何用 Next.js 16 + React 19 + GSAP 构建高端餐饮品牌的数字门面。

**核心目标**
- 视觉:极简、克制、高级感(黑色背景 + 金色点缀 + 大量留白)
- 动效:沉浸但不喧宾夺主,关键节点强调,非关键处保持安静
- 体验:Desktop 优先,Tablet / Mobile 完整可用,支持 `prefers-reduced-motion`
- 工程:类型安全、SSR 安全、动画参数集中管理

**非目标**
- 不做 CMS / 后台管理(数据硬编码)
- 不做多语言(仅英文)
- 不做支付 / 会员系统

---

## 2. 技术栈

| 层 | 技术 | 版本 | 用途 |
|---|---|---|---|
| 框架 | Next.js | 16.2.6 | App Router + 静态生成 |
| UI | React | 19.2.4 | 组件层 |
| 类型 | TypeScript | 5 | 严格模式 |
| 样式 | Tailwind CSS | 4 | 原子化 + Design Tokens |
| 动画核心 | GSAP | 3.15.0 | Timeline + ScrollTrigger |
| 字符动画 | SplitType | 0.3.4 | Hero 标题字符级拆分 |
| 平滑滚动 | Lenis | 1.3.23 | 桌面端 |
| 页面过渡 | Framer Motion | 12.40.0 | Phase 3 预留 |
| 表单 | React Hook Form | 7.76.0 | Phase 3A 启用 |
| 校验 | Zod | 4.4.3 | Phase 3A 启用 |

---

## 3. 设计系统

### 色彩
- 背景:深黑 (`--color-bg`)
- 主文:近白 (`--color-fg`)
- 点缀:金色 (`--color-accent`)
- 辅助:中性灰阶(border / muted text)
- 全部走 CSS Variables,严禁硬编码 hex

### 字体层级
| 角色 | 桌面 | 用途 |
|---|---|---|
| H1 | 72px | Hero 标题 |
| H2 | 48px | Section 标题 |
| H3 | 32px | 卡片标题 |
| Body | 18px | 正文 |
| Label | 12-14px | 段标签、版权 |

### 间距与栅格
- 所有主内容必须放进 `.site-container`(`globals.css` 中定义)
- 不使用 Tailwind `max-w-[1440px] mx-auto` 模拟容器(Tailwind 4 在 flex 父容器下不稳)
- Section 垂直间距:`py-20 lg:py-40`

### 动效原则
- 克制 > 炫技
- 入场用一次,Section 内不做循环动画
- 时长统一从 [lib/animations.ts](./lib/animations.ts) 取
- 缓动:`cubic-bezier(0.16, 1, 0.3, 1)`
- 所有动效必须支持 `prefers-reduced-motion`

---

## 4. 页面结构

单页应用,从上到下:

| Section | 组件 | 内容 |
|---|---|---|
| Hero | [components/hero/HeroSection.tsx](./components/hero/HeroSection.tsx) | 全屏背景图 + 品牌标题 + 副标题 + 装饰线 |
| Philosophy | [components/philosophy/](./components/philosophy/) | 引言 + 三篇短文章卡片 |
| Menu | [components/menu/MenuSection.tsx](./components/menu/MenuSection.tsx) | 菜单卡片网格(图 + 名 + 描述 + 价) |
| Reservation | [components/reservation/ReservationSection.tsx](./components/reservation/ReservationSection.tsx) | 预约表单 + 营业时间 / 联系信息块 |
| Footer | [components/footer/Footer.tsx](./components/footer/Footer.tsx) | Logo + 多栏链接 + 社交 + 版权 |

布局规则详见 [CLAUDE.md](./CLAUDE.md) 的 "Layout Rules" 章节。

---

## 5. Phase 2 已完成内容

### 静态层(Phase 1)
- [x] 五个 Section 全部静态可见
- [x] Design Tokens(CSS Variables)落地
- [x] `.site-container` 布局规范
- [x] 响应式 Desktop / Tablet / Mobile

### 动效层(Phase 2)
- [x] Hero 入场:GSAP Timeline + SplitType 字符动画
- [x] Philosophy ScrollTrigger:引言模糊 + 文章横向入场
- [x] Menu ScrollTrigger:卡片缩放 + 视差
- [x] Reservation ScrollTrigger:表单字段 stagger + 信息块横向入场
- [x] Footer ScrollTrigger:Logo + 栏目 stagger + 版权
- [x] Lenis 平滑滚动 + ScrollTrigger 协同(RAF + `ScrollTrigger.update()`)
- [x] `prefers-reduced-motion` 全局降级
- [x] SSR 安全(`'use client'` + `typeof window` 检测)
- [x] 动画常量统一到 [lib/animations.ts](./lib/animations.ts)

部署地址:https://harbor-table-nu.vercel.app/
最新 commit:`51835b1 feat: complete Phase 2 animated restaurant website`

---

## 6. Phase 3 Roadmap

Phase 3 主题:**高级交互层**。在已有静态 + 入场动画之上,补齐"指针交互"与"功能性表单"。

执行顺序(已确认):

| 子阶段 | 范围 | 优先级 | 状态 |
|---|---|---|---|
| **3A** | Reservation 表单验证(React Hook Form + Zod) | P0 功能增强 | 待开始 |
| **3B** | Magnetic Button(沉淀 pointer-fine / reduced-motion 交互模式) | P1 模式建设 | 待开始 |
| **3C** | Menu 卡片 3D tilt(双层结构避免 transform 叠加) | P1 视觉强化 | 待开始 |
| **3D** | Footer 微交互(链接下划线、社交图标 hover) | P2 细节打磨 | 待开始 |
| **3E** | Hero 鼠标视差(在 intro `onComplete` 后挂载) | P2 沉浸感 | 待开始 |
| **Final QA** | 全 Section 回归 + a11y + Lighthouse + 报告 | 必做 | 待开始 |

### 顺序设计原因
- 3A 先做:功能增强、风险可控、与现有动画无 transform 冲突
- 3B 中段:统一 `pointer: fine` + reduced-motion 交互模式,后续 3C / 3E 复用
- 3C 之后:tilt 涉及 transform 叠加,放在 Magnetic Button 沉淀完模式之后
- 3E 最后:Hero 是首屏,放最后避免影响入场稳定性

### 验收门槛(每个子阶段)
- `npm run lint` 警告数不超过 Phase 2 基线(5 个)
- `npm run build` 绿
- `prefers-reduced-motion` 状态下交互全部静默
- 移动端(`pointer: coarse`)所有指针交互短路,触摸不报错
- Phase 2 已有动画无回归

---

## 7. 不做清单(Phase 3 范围外)

以下功能**明确不在 Phase 3 范围**,放进 Phase 4+ 或永不做:

- 表单提交到后端(Phase 3 仅做前端校验)
- CMS 数据源接入
- 多语言 i18n
- 路由 / 多页面 + Framer Motion 页面切换
- Lighthouse 性能监控仪表盘
- 图片从 Unsplash 迁到本地

如需扩展任意一项,必须新开 Phase 提案,不得在 Phase 3 内顺手做。
