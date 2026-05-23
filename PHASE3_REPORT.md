# Phase 3 Report: Interactive Enhancements

**Status**: ✅ Completed  
**Branch**: `phase-3-interactions`  
**Duration**: Phase 3A-3E  
**Commits**: 8 feature commits

---

## Overview

Phase 3 为 Harbor Table 网站添加了轻量、高级的交互增强,在保持 Phase 2 动画稳定性的前提下,提升用户体验和表单功能。所有交��均遵循"克制 > 炫技"的设计理念,并实现了完整的降级策略。

**核心原则**:
- 首屏稳定性优先
- 完整的降级策略(pointer: coarse / prefers-reduced-motion)
- 无障碍支持(aria / focus-visible)
- 性能优化(GSAP quickTo / passive 事件监听)
- 避免 transform 冲突(分层 DOM 结构)

---

## Completed Sub-phases

### Phase 3A: Reservation Form Validation

**目标**: 为 Reservation Section 添加客户端表单验证

**实现**:
- 集成 React Hook Form + Zod
- 5 个字段验证:name / email / date / guests / notes
- 实时错误提示(aria-invalid / aria-describedby)
- 提交中状态(isSubmitting)
- 保持 ScrollTrigger 入场动画不变

**技术栈**:
- `react-hook-form` - 表单状态管理
- `zod` - Schema 验证
- `@hookform/resolvers` - RHF + Zod 集成

**文件**:
- `lib/reservationSchema.ts` - Zod schema 定义
- `components/reservation/ReservationSection.tsx` - RHF 接入

**Commit**: `3f44970`

---

### Phase 3B: Magnetic Button

**目标**: 为 Hero CTA 和 Reservation Submit 按钮添加磁吸交互

**实现**:
- 可复用的 `MagneticButton` 组件
- 鼠标靠近时按钮轻微位移跟随指针
- 使用 GSAP `quickTo` 实现平滑动画
- 支持 `forwardRef`(Hero intro 动画需要 ref)
- 使用 `useImperativeHandle` 合并内外部 ref

**降级策略**:
- `pointer: coarse` - 移动端禁用
- `prefers-reduced-motion` - 禁用位移
- 键盘 focus - 不触发位移
- `disabled` 状态 - 禁用磁吸

**文件**:
- `hooks/useMagnetic.ts` - 磁吸交互 hook
- `components/ui/MagneticButton.tsx` - 可复用按钮组件
- `lib/animations.ts` - `MAGNETIC` 常量

**Commit**: `f4c06f2`

---

### Phase 3C: Menu Card 3D Tilt

**目标**: 为 Menu 卡片添加轻量 3D 倾斜交互

**实现**:
- 双层 DOM 结构避免 transform 冲突:
  - 外层 `<article>` - ScrollTrigger 控制 y / opacity / scale
  - 内层 `<div>` - useTilt 控制 rotateX / rotateY
- 鼠标移动时卡片轻微 3D 倾斜
- 使用 GSAP `quickTo` 实现平滑动画

**Bugfix**:
- 移除外层 `overflow-hidden` - 防止文字/价格被裁切
- 移除 `translateZ` 深度 - 简化 3D 结构
- 增加 Menu Section 底部间距 - 避免与 Reservation 贴边

**降级策略**:
- `pointer: coarse` - 移动端禁用
- `prefers-reduced-motion` - 禁用倾斜
- 键盘 focus - 不触发倾斜

**文件**:
- `hooks/useTilt.ts` - 3D tilt 交互 hook
- `components/menu/MenuCard.tsx` - 双层结构 + useTilt
- `components/menu/MenuSection.tsx` - 底部间距修复
- `lib/animations.ts` - `TILT` 常量

**Commit**: `2d5c0da`

---

### Phase 3D: Footer Micro-interactions

**目标**: 为 Footer 添加轻量、高级的微交互

**实现**:
- 社交链接下划线动画(纯 CSS):
  - 使用 `::after` 伪元素
  - hover 时从左到右展开(400ms)
  - 同时文字颜色变金色
- Footer Logo letter-spacing 微交互:
  - hover 时字间距轻微扩张
  - 保持高级餐厅质感

**降级策略**:
- `prefers-reduced-motion` - 禁用动画,保留颜色变化
- `:focus-visible` - 显示金色 outline,不显示下划线

**文件**:
- `app/globals.css` - 新增 `.footer-social-link` / `.footer-logo` 样式
- `components/footer/Footer.tsx` - 应用新 CSS 类名

**Commit**: `b343885`

---

### Phase 3E: Hero Mouse Parallax

**目标**: 为 Hero Section 添加轻量鼠标视差

**实现**:
- 分层 DOM 结构避免 transform 冲突:
  - 外层 `backgroundLayerRef` - parallax 控制 x / y
  - 内层 `backgroundRef` - intro 控制 scale / opacity
  - 外层 `titleLayerRef` - parallax 控制 x / y
  - 内层 `titleRef` - intro 控制 y / opacity / clipPath
- **关键约束**: parallax 必须在 intro 完成后才启用
- 使用 `onIntroComplete` callback + state 控制启用时机
- 背景层反向移动,标题层正向移动,产生空间层次感

**Bugfix**:
- 修复 Hero intro 重复播放问题:
  - 将 `useHeroIntro` 依赖项从 `[refs]` 改为 `[]`
  - 确保 intro 动画只在组件 mount 时执行一次

**降级策略**:
- `pointer: coarse` - 移动端禁用
- `prefers-reduced-motion` - 禁用视差
- 键盘 focus - 不触发视差
- `enabled` 状态 - intro 未完成时禁用

**文件**:
- `hooks/useHeroParallax.ts` - 鼠标视差 hook
- `hooks/useHeroIntro.ts` - 添加 `onIntroComplete` callback
- `components/hero/HeroSection.tsx` - 分层结构 + parallax 启用逻辑
- `lib/animations.ts` - `HERO_PARALLAX` 常量

**Commit**: `8f605ba`

---

## Technical Highlights

### 1. React Hook Form + Zod

**优势**:
- 类型安全的表单验证
- 声明式 schema 定义
- 自动错误提示
- 性能优化(uncontrolled components)

**示例**:
```typescript
const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  guests: z.string().refine((val) => {
    const num = parseInt(val, 10);
    return num >= 1 && num <= 12;
  }, 'Party size must be between 1 and 12'),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

---

### 2. GSAP quickTo

**优势**:
- 比 `gsap.to()` 性能更优
- 适合高频更新(鼠标移动)
- 自动处理动画帧

**示例**:
```typescript
const quickToX = gsap.quickTo(element, 'x', {
  duration: 0.25,
  ease: 'power2.out',
});

// 高频调用,无性能问题
quickToX(offsetX);
```

---

### 3. pointer: fine 降级策略

**原理**:
- `pointer: fine` - 桌面端(鼠标/触控板)
- `pointer: coarse` - 移动端(触摸屏)

**实现**:
```typescript
const isPointerFine = window.matchMedia('(pointer: fine)').matches;
if (!isPointerFine) return;  // 移动端跳过
```

**应用场景**:
- Magnetic Button - 移动端触摸不触发磁吸
- Menu 3D Tilt - 移动端触摸不触发倾斜
- Hero Parallax - 移动端触摸不触发视差

---

### 4. prefers-reduced-motion

**原理**:
- 用户开启"减少动态效果"时禁用动画
- 保持静态可见,不影响功能

**实现**:
```typescript
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
```

**应用场景**:
- Hero intro - 跳过动画,静态可见
- ScrollTrigger - 跳过动画,静态可见
- Magnetic / Tilt / Parallax - 禁用交互

---

### 5. ScrollTrigger Cleanup

**原理**:
- 每个 Section 的 ScrollTrigger 实例存储在数组中
- cleanup 时只 kill 当前 Section 的实例
- 避免影响其他 Section

**实现**:
```typescript
const triggers: InstanceType<typeof ScrollTriggerType>[] = [];

const trigger = ScrollTrigger.create({ ... });
triggers.push(trigger);

return () => {
  triggers.forEach((trigger) => trigger.kill());
};
```

---

### 6. 双层 DOM 避免 transform 冲突

**问题**:
- ScrollTrigger 和 Tilt 同时控制同一个元素的 `transform`
- CSS `transform` 属性会互相覆盖

**解决方案**:
```tsx
<article>  {/* 外层 - ScrollTrigger 控制 y / opacity / scale */}
  <div>    {/* 内层 - Tilt 控制 rotateX / rotateY */}
    {/* 内容 */}
  </div>
</article>
```

**应用场景**:
- Menu Card - 外层 ScrollTrigger,内层 Tilt
- Hero Section - 外层 Parallax,内层 Intro

---

### 7. Hero intro 完成后再启用 parallax

**问题**:
- Intro 播放期间鼠标移动会导致 transform 叠加抖动

**解决方案**:
```typescript
// useHeroIntro.ts
timeline = gsap.timeline({
  onComplete: () => {
    refs.onIntroComplete?.();  // 通知 HeroSection
  },
});

// HeroSection.tsx
const [parallaxEnabled, setParallaxEnabled] = useState(false);

useHeroIntro({
  onIntroComplete: () => setParallaxEnabled(true),
});

useHeroParallax({
  enabled: parallaxEnabled,  // intro 完成后才启用
});
```

---

## Fixed Issues

### Issue 1: Menu 卡片裁切

**现象**:
- 菜品名称左侧被裁切
- 价格底部被裁切
- Menu 和 Reservation 间距过紧

**根因**:
- 外层 `<article>` 的 `overflow-hidden` 裁切了所有超出边界的内容
- 内层使用 `translateZ` ���,在 3D tilt 时会超出父容器,被裁掉
- 卡片内容区域 `py-6` 不足以容纳价格

**修复**:
- 移除外层 `overflow-hidden`
- 移除 `translateZ` 深度(简化 3D 结构)
- 增加内容区域底部 padding(`py-6 pb-8`)
- 增加 Menu Section 底部间距(`py-20 pb-32 lg:py-40 lg:pb-48`)

**Commit**: `2d5c0da`

---

### Issue 2: Hero intro 重复播放

**现象**:
- 刷新页面后 Hero intro 播放两次

**根因**:
- `useHeroIntro` 的 `useEffect` 依赖项是 `[refs]`
- 每次 `HeroSection` re-render,`refs` 对象都是新的
- `setParallaxEnabled(true)` 触发 re-render → `useEffect` 重新执行 → intro timeline 重新播放

**修复**:
- 将 `useHeroIntro` 的依赖项从 `[refs]` 改为 `[]`
- 添加 `eslint-disable-next-line` 注释
- 确保 intro 动画只在组件 mount 时执行一次

**Commit**: `8f605ba`

---

## QA Results

### Build / Lint

**Build**:
```
✓ Compiled successfully in 1633ms
✓ TypeScript 1722ms
✓ Generating static pages 4/4 in 412ms
```

**Lint**:
```
✖ 5 problems (0 errors, 5 warnings)
```

**警告数量**: 与 Phase 2 基线持平,无新增 ✅

---

### Code Review

**事件监听器**:
- ✅ 所有交互 hooks 都有完整的 cleanup
- ✅ 使用 `{ passive: true }` 优化性能
- ✅ 无重复事件监听器

**降级策略**:
- ✅ `pointer: fine` / `pointer: coarse` 检测
- ✅ `prefers-reduced-motion` 检测
- ✅ 键盘 focus 不触发交互

**无障碍**:
- ✅ 表单错误有 `aria-invalid` / `aria-describedby`
- ✅ 所有交互元素有 `:focus-visible` 样式
- ✅ 图片有 `alt` 属性
- ✅ 按钮/链接语义正确

**性能**:
- ✅ 无内存泄漏风险
- ✅ 无不必要的 rAF 循环
- ✅ ScrollTrigger 只 kill 当前 Section

---

### Browser Testing

**功能测试**:
- ✅ Hero intro 只播放一次
- ✅ Hero parallax 只在 intro 后启用
- ✅ Hero CTA MagneticButton 正常
- ✅ Lenis 桌面平滑滚动正常
- ✅ Philosophy ScrollTrigger 正常
- ✅ Menu ScrollTrigger 入场正常
- ✅ Menu 3D tilt 正常,不裁切文字和价格
- ✅ Reservation ScrollTrigger 正常
- ✅ Reservation 表单验证正常
- ✅ Reservation Submit MagneticButton 正常
- ✅ Footer ScrollTrigger 正常
- ✅ Footer 社交链接 hover / focus 正常

**降级测试**:
- ✅ `prefers-reduced-motion` - 所有动画禁用或静态可见
- ✅ `pointer: coarse` - 所有交互禁用,页面原生滚动正常

**无障碍测试**:
- ✅ Tab 键能访问所有交互元素
- ✅ `:focus-visible` 清晰可见
- ✅ 表单错误有 aria 属性
- ✅ 屏幕阅读器正常

**响应式测试**:
- ✅ Desktop ≥ 1440px
- ✅ Laptop 1024-1439px
- ✅ Tablet 768-1023px
- ✅ Mobile < 768px

---

## Next Steps

### 1. Merge to main

```bash
git checkout main
git merge phase-3-interactions
git push origin main
```

### 2. Deploy to Production

**Vercel 自动部署**:
- Push to `main` 触发自动部署
- 部署 URL: https://harbor-table-nu.vercel.app/

**部署前检查**:
- ✅ Build 通过
- ✅ Lint 警告数持平
- ✅ 浏览器测试通过
- ✅ 降级策略完整
- ✅ 无障碍支持完整

### 3. Post-deployment Monitoring

**关注指标**:
- 首屏加载时间(FCP / LCP)
- 交互响应时间(FID / INP)
- 表单提交成功率
- 移动端体验(CrUX 数据)

**潜在优化**:
- 图片懒加载(Menu / Philosophy)
- 字体子集化(减少 FOUT)
- GSAP 按需加载(动态 import)

---

## Conclusion

Phase 3 成功为 Harbor Table 网站添加了轻量、高级的交互增强,在保持 Phase 2 动画稳定性的前提下,提升了用户体验和表单功能。所有交互均遵循"克制 > 炫技"的设计理念,并实现了完整的降级策略和无障碍支持。

**Phase 3 成果**:
- ✅ 5 个子阶段全部完成
- ✅ 8 个功能 commit
- ✅ 0 个阻塞性问题
- ✅ 0 个新增警告
- ✅ 完整的降级策略
- ✅ 完整的无障碍支持
- ✅ 浏览器测试通过

**项目状态**: 已完成,建议合并到 `main` 分支并部署到生产环境。
