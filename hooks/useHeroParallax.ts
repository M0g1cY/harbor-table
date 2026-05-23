'use client';

import { useEffect, RefObject } from 'react';
import { prefersReducedMotion, HERO_PARALLAX } from '@/lib/animations';

/**
 * useHeroParallax - Hero Section 鼠标视差 Hook
 *
 * 功能：
 * - 鼠标移动时背景层和标题层轻微位移，产生空间层次感
 * - 只在 pointer: fine 设备启用（桌面端）
 * - prefers-reduced-motion 开启时禁用
 * - 必须在 intro 动画完成后才启用，避免 transform 冲突
 * - 使用 GSAP quickTo 实现平滑动画
 *
 * SSR 安全：
 * - 标记 'use client'
 * - GSAP 在 useEffect 内动态 import
 * - typeof window 防御
 */

interface UseHeroParallaxOptions {
  /** Hero 根容器 ref */
  heroRootRef: RefObject<HTMLElement | null>;
  /** 背景层 ref */
  backgroundLayerRef: RefObject<HTMLDivElement | null>;
  /** 标题层 ref */
  titleLayerRef: RefObject<HTMLDivElement | null>;
  /** 是否启用（intro 完成后才为 true） */
  enabled: boolean;
}

export function useHeroParallax({
  heroRootRef,
  backgroundLayerRef,
  titleLayerRef,
  enabled,
}: UseHeroParallaxOptions) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!enabled) return;

    const heroRoot = heroRootRef.current;
    const backgroundLayer = backgroundLayerRef.current;
    const titleLayer = titleLayerRef.current;

    if (!heroRoot || !backgroundLayer || !titleLayer) return;

    // 检查 reduced-motion 偏好
    const reduced = prefersReducedMotion();
    if (reduced) return;

    // 检查是否为 pointer: fine 设备（桌面端）
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    let bgQuickToX: ((value: number) => void) | null = null;
    let bgQuickToY: ((value: number) => void) | null = null;
    let titleQuickToX: ((value: number) => void) | null = null;
    let titleQuickToY: ((value: number) => void) | null = null;

    (async () => {
      const { default: gsap } = await import('gsap');

      // 创建 quickTo 函数用于平滑位移
      bgQuickToX = gsap.quickTo(backgroundLayer, 'x', {
        duration: HERO_PARALLAX.lerp,
        ease: 'power2.out',
      });
      bgQuickToY = gsap.quickTo(backgroundLayer, 'y', {
        duration: HERO_PARALLAX.lerp,
        ease: 'power2.out',
      });

      titleQuickToX = gsap.quickTo(titleLayer, 'x', {
        duration: HERO_PARALLAX.lerp,
        ease: 'power2.out',
      });
      titleQuickToY = gsap.quickTo(titleLayer, 'y', {
        duration: HERO_PARALLAX.lerp,
        ease: 'power2.out',
      });

      const handlePointerMove = (e: PointerEvent) => {
        // 键盘 focus 时不触发
        if (e.pointerType === '') return;

        const rect = heroRoot.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 计算鼠标相对于 Hero 中心的位置（归一化到 -1 ~ 1）
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        // 背景层移动（轻微，反向）
        const bgOffsetX = -deltaX * HERO_PARALLAX.bgStrength;
        const bgOffsetY = -deltaY * HERO_PARALLAX.bgStrength;

        // 标题层移动（更明显，正向）
        const titleOffsetX = deltaX * HERO_PARALLAX.titleStrength;
        const titleOffsetY = deltaY * HERO_PARALLAX.titleStrength;

        if (bgQuickToX && bgQuickToY && titleQuickToX && titleQuickToY) {
          bgQuickToX(bgOffsetX);
          bgQuickToY(bgOffsetY);
          titleQuickToX(titleOffsetX);
          titleQuickToY(titleOffsetY);
        }
      };

      const handlePointerLeave = () => {
        // 鼠标离开时回到原位
        if (bgQuickToX && bgQuickToY && titleQuickToX && titleQuickToY) {
          bgQuickToX(0);
          bgQuickToY(0);
          titleQuickToX(0);
          titleQuickToY(0);
        }
      };

      // 使用 passive 监听器优化性能
      heroRoot.addEventListener('pointermove', handlePointerMove, { passive: true });
      heroRoot.addEventListener('pointerleave', handlePointerLeave, { passive: true });

      // Cleanup
      return () => {
        heroRoot.removeEventListener('pointermove', handlePointerMove);
        heroRoot.removeEventListener('pointerleave', handlePointerLeave);
        // 重置位移
        gsap.set([backgroundLayer, titleLayer], { x: 0, y: 0 });
      };
    })();
  }, [heroRootRef, backgroundLayerRef, titleLayerRef, enabled]);
}
