'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/animations';

/**
 * useLenis - 全站平滑滚动 Hook
 *
 * 行为：
 * - 仅在浏览器端初始化（typeof window 守卫）
 * - 用 requestAnimationFrame 驱动 lenis.raf(time)
 * - prefers-reduced-motion: reduce → 不启用 Lenis，回退原生滚动
 * - 移动端（pointer: coarse）→ 不启用 Lenis，保留原生惯性滚动
 * - cleanup：destroy Lenis 实例 + cancelAnimationFrame
 *
 * 之所以移动端禁用 Lenis：
 * - iOS Safari 和 Android Chrome 自带的橡皮筋/惯性滚动比 Lenis 模拟更原生
 * - 移动端虚拟键盘弹起、scroll restoration、pull-to-refresh 与 Lenis 易冲突
 * - Phase 2B-1 阶段优先稳定，桌面端先享受 Lenis 平滑滚动
 *
 * Phase 2B-2 增强：
 * - 在 raf 循环中调用 ScrollTrigger.update()，让 ScrollTrigger 与 Lenis 帧同步
 * - 不动核心结构，只在 raf tick 内追加一次 update 调用（懒加载，不增加 SSR 体积）
 */
export function useLenis() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (prefersReducedMotion()) return;

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return;

    let rafId = 0;
    let lenisInstance: { raf: (time: number) => void; destroy: () => void } | null = null;
    let cancelled = false;
    let scrollTriggerUpdate: (() => void) | null = null;

    (async () => {
      const [{ default: Lenis }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      // 缓存 update 引用，避免 raf 内重复属性查找
      scrollTriggerUpdate = () => ScrollTrigger.update();

      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      const raf = (time: number) => {
        lenisInstance?.raf(time);
        // Lenis 改变滚动位置后立即同步 ScrollTrigger，避免触发位置漂移
        scrollTriggerUpdate?.();
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);
}
