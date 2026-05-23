# Harbor Table - 项目规范

## 项目概述
高端餐厅官网，强调极简美学、流畅动画、沉浸式体验。

## 技术栈
- Next.js 16.2.6 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP (动画核心)
- Lenis (平滑滚动)
- Framer Motion (页面过渡)
- React Hook Form + Zod (表单)

## 设计原则
1. **极简主义**：黑色背景，大量留白，金色点缀
2. **字体层级**：H1=72px, H2=48px, H3=32px, Body=18px
3. **动画克制**：只在关键交互点使用，避免过度
4. **性能优先**：图片懒加载，动画优化，代码分割

## 开发规范

### 分支管理
- 禁止在 main 分支直接开发
- L2/L3 任务必须使用 worktree
- 功能完成后提交 PR

### 代码规范
- 组件使用 TypeScript 严格模式
- 所有组件必须有类型定义
- 使用 CSS Variables 而非硬编码颜色
- 动画使用 GSAP 或 Framer Motion，避免混用

### 提交前检查
```bash
npm run lint
npm run build
```

### 禁止事项
- 不得扩大需求范围
- 不得顺手重构无关代码
- 不得吞掉错误信息
- 不得泄露完整 stack trace
- API key 只能存环境变量

## Layout Rules（硬性规则，所有 Phase 必须遵守）

- All main section content must live inside `.site-container`.
- Each section should use: `<section> → <div className="site-container"> → content`.
- Do not place primary text, cards, forms, or footer columns directly at viewport `left: 0`.
- Do not use `absolute`, `left-0`, or full-width positioning for main content.
- Full-width layout is allowed only for backgrounds, decorative lines, overlays, or hero visual layers.
- Footer content must also use `.site-container`; only its top divider line may span full width.
- After modifying any section, check desktop and mobile layouts for left-edge sticking and horizontal overflow.

### 背景说明
Tailwind CSS 4 在某些 flex 父容器下，arbitrary value max-width（如 `max-w-[1440px]`）配合 `mx-auto` 不稳定，会导致内容贴左边、右侧空白。因此项目统一使用 `globals.css` 中定义的纯 CSS `.site-container` 类，不依赖 Tailwind utility 组合。

### 正确示例
```tsx
<section className="relative w-full py-20 lg:py-40">
  <div className="site-container">
    {/* section 内容 */}
  </div>
</section>
```

### 错误示例
```tsx
{/* ❌ 直接堆叠，内容会贴边 */}
<section className="py-20">
  <h2>标题</h2>
  <div>内容</div>
</section>

{/* ❌ 用 Tailwind utility 模拟 container，在 Tailwind 4 下不稳定 */}
<section>
  <div className="mx-auto max-w-[1440px] px-6">
    内容
  </div>
</section>
```

## 目录结构
```
app/
  page.tsx          # 首页
  layout.tsx        # 根布局
  globals.css       # 全局样式
components/
  hero/             # 首屏 Hero
  philosophy/       # 理念区块
  menu/             # 菜单展示
  reservation/      # 预约表单
  footer/           # 页脚
  ui/               # 通用 UI 组件
hooks/              # 自定义 Hooks
lib/                # 工具函数
types/              # TypeScript 类型定义
```

## Phase 完成状态
- [x] Phase 0: 项目初始化
- [x] Phase 1: 静态版本（Hero / Philosophy / Menu / Reservation / Footer）
- [x] Phase 2: 动画层（Hero 入场 + 5 个 Section ScrollTrigger + Lenis）
- [ ] Phase 3: 高级交互（表单验证 / Magnetic / Tilt / Footer 微交互 / Hero 视差）

## Phase 3 分支策略

Phase 3 使用单 feature branch 开发：`phase-3-interactions`。

- 除非需要并行开发多个方向，否则不强制使用 worktree。
- 单分支推进，单子阶段单 commit，便于回溯与回滚。
- 完成 Phase 3 后再合回 main 并部署。

> 这是对 Phase 3 的特例化决策，与 CLAUDE.md 顶部"L2/L3 必须 worktree"的通用规则并存：
> - 通用规则仍然适用于未来其他 L2/L3 任务。
> - Phase 3 子阶段彼此线性依赖（共享 transform / 指针交互模式），并行收益低、协调成本高，因此选择单分支。

## Phase 3 执行顺序

确认顺序（先功能增强、再交互模式沉淀、最后影响首屏的高风险项）：

1. **Phase 3A** — Reservation 表单验证（React Hook Form + Zod）
2. **Phase 3B** — Magnetic Button（沉淀 pointer-fine / reduced-motion 交互模式）
3. **Phase 3C** — Menu 卡片 3D tilt（双层结构避免与 ScrollTrigger 视差的 transform 叠加）
4. **Phase 3D** — Footer 微交互（链接下划线、社交图标 hover）
5. **Phase 3E** — Hero 鼠标视差（必须在 intro timeline `onComplete` 之后挂载）
6. **Phase 3 Final QA** — 全 Section 回归 + a11y + Lighthouse + PHASE3_REPORT.md

### 顺序设计原因
- 表单验证是功能增强，与现有动画无 transform 冲突，优先做
- Magnetic Button 先沉淀 `pointer: fine` + reduced-motion 模式，后续 3C / 3E 直接复用
- Menu tilt 涉及 transform 叠加，放在交互模式沉淀完之后更稳
- Hero 鼠标视差影响首屏稳定性，最后做

### Phase 3A 起步动作
进入 3A 时第一步先单独安装并 commit：
```bash
npm i @hookform/resolvers
git add package.json package-lock.json
git commit -m "chore: add hookform resolvers"
```
不得与功能代码混进同一 commit。

## Phase 2 工程规则（ScrollTrigger + GSAP）

### 1. ScrollTrigger Hooks 规范
**useEffect 依赖数组必须是空数组 `[]`**
- 原因：ScrollTrigger 只需初始化一次，重复初始化会导致动画叠加
- ESLint 会报 `react-hooks/exhaustive-deps` 警告，这是预期行为
- 可以添加注释忽略：`// eslint-disable-next-line react-hooks/exhaustive-deps`

**cleanup 只能 kill 当前 Section 的 triggers**
```typescript
// ❌ 错误：会杀掉所有 Section 的动画
return () => {
  ScrollTrigger.getAll().forEach(t => t.kill());
};

// ✅ 正确：只杀掉当前 Section 的动画
return () => {
  ScrollTrigger.getAll().forEach((t) => {
    if (t.trigger === refs.section.current) {
      t.kill();
    }
  });
};
```

### 2. 动画参数管理
**所有动画参数必须从 `lib/animations.ts` 读取**
- 禁止硬编码魔法数字（时长、缓动、位移、stagger）
- 统一管理便于全局调整动画节奏
- 导出常量：`DURATION`, `EASE_OUT`, `HERO_INTRO`, `SCROLL_TRIGGER`

```typescript
// ❌ 错误：硬编码
gsap.to(element, { y: 0, duration: 0.8, ease: 'power2.out' });

// ✅ 正确：从 animations.ts 读取
import { SCROLL_TRIGGER, EASE_OUT } from '@/lib/animations';
gsap.to(element, { 
  y: 0, 
  duration: SCROLL_TRIGGER.titleDuration, 
  ease: EASE_OUT 
});
```

### 3. prefers-reduced-motion 降级
**所有动画 hook 必须检查用户偏好**
```typescript
import { prefersReducedMotion } from '@/lib/animations';

useEffect(() => {
  if (prefersReducedMotion()) return; // 跳过动画
  // ... GSAP 动画代码
}, []);
```

### 4. Lenis + ScrollTrigger 协同
**RAF 循环中必须调用 `ScrollTrigger.update()`**
```typescript
function raf(time: number) {
  lenis.raf(time);
  ScrollTrigger.update(); // 必须调用，否则 ScrollTrigger 不触发
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

### 5. SSR 安全
**所有动画 hook 必须是 SSR 安全的**
- 文件顶部添加 `'use client'`
- useEffect 内检查 `typeof window !== 'undefined'`
- 动态导入 GSAP：`const { gsap } = await import('gsap')`

```typescript
'use client';

useEffect(() => {
  if (typeof window === 'undefined') return;
  // ... 动画代码
}, []);
```

### 6. 动画时序规范
**Hero 入场动画必须在页面加载后延迟 0.1s**
- 原因：让首屏先稳定渲染一帧，避免闪烁
- 使用 `HERO_INTRO.startDelay` 常量

**ScrollTrigger 触发位置统一使用 `lib/animations.ts` 常量**
- `startDefault: 'top 80%'` - 标准触发位置
- `startEarly: 'top 85%'` - Footer 等提前触发
- `startLate: 'top 75%'` - 需要延迟触发的元素

## 下一步
Phase 3A: Reservation 表单验证（React Hook Form + Zod）

详见上方 "Phase 3 执行顺序" 与 [PROJECT_SPEC.md](./PROJECT_SPEC.md) Section 6。

