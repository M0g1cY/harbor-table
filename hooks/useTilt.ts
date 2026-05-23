'use client';

import { useEffect, RefObject } from 'react';
import { prefersReducedMotion, TILT } from '@/lib/animations';

/**
 * useTilt - 3D Tilt 交互 Hook
 *
 * 功能：
 * - 鼠标移动时卡片轻微 3D 倾斜（rotateX/rotateY）
 * - 只在 pointer: fine 设备启用（桌面端）
 * - prefers-reduced-motion 开启时禁用
 * - 键盘 focus 时不触发倾斜
 * - 使用 GSAP quickTo 实现平滑动画
 *
 * SSR 安全：
 * - 标记 'use client'
 * - GSAP 在 useEffect 内动态 import
 * - typeof window 防御
 */

interface UseTiltOptions {
  /** 卡片元素 ref */
  cardRef: RefObject<HTMLElement | null>;
  /** 是否禁用 */
  disabled?: boolean;
}

export function useTilt({ cardRef, disabled = false }: UseTiltOptions) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (disabled) return;

    const card = cardRef.current;
    if (!card) return;

    // 检查 reduced-motion 偏好
    const reduced = prefersReducedMotion();
    if (reduced) return;

    // 检查是否为 pointer: fine 设备（桌面端）
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    let quickToRotateX: ((value: number) => void) | null = null;
    let quickToRotateY: ((value: number) => void) | null = null;

    (async () => {
      const { default: gsap } = await import('gsap');

      // 创建 quickTo 函数用于平滑旋转
      quickToRotateX = gsap.quickTo(card, 'rotateX', {
        duration: TILT.lerp,
        ease: 'power2.out',
      });
      quickToRotateY = gsap.quickTo(card, 'rotateY', {
        duration: TILT.lerp,
        ease: 'power2.out',
      });

      const handlePointerMove = (e: PointerEvent) => {
        // 键盘 focus 时不触发（通过检查 pointerType）
        if (e.pointerType === '') return;

        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 计算鼠标相对于卡片中心的位置（归一化到 -1 ~ 1）
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        // 计算旋转角度
        // Y 轴旋转：鼠标左右移动
        // X 轴旋转：鼠标上下移动（取反，向上移动时卡片向上倾斜）
        const rotateY = deltaX * TILT.maxDeg;
        const rotateX = -deltaY * TILT.maxDeg;

        if (quickToRotateX && quickToRotateY) {
          quickToRotateX(rotateX);
          quickToRotateY(rotateY);
        }
      };

      const handlePointerLeave = () => {
        // 鼠标离开时回到原位
        if (quickToRotateX && quickToRotateY) {
          quickToRotateX(0);
          quickToRotateY(0);
        }
      };

      // 使用 passive 监听器优化性能
      card.addEventListener('pointermove', handlePointerMove, { passive: true });
      card.addEventListener('pointerleave', handlePointerLeave, { passive: true });

      // Cleanup
      return () => {
        card.removeEventListener('pointermove', handlePointerMove);
        card.removeEventListener('pointerleave', handlePointerLeave);
        // 重置旋转
        gsap.set(card, { rotateX: 0, rotateY: 0 });
      };
    })();
  }, [cardRef, disabled]);
}
