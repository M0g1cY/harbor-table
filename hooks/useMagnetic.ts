'use client';

import { useEffect, RefObject } from 'react';
import { prefersReducedMotion, MAGNETIC } from '@/lib/animations';

/**
 * useMagnetic - Magnetic Button 交互 Hook
 *
 * 功能：
 * - 鼠标靠近时按钮轻微位移跟随指针（磁吸效果）
 * - 只在 pointer: fine 设备启用（桌面端）
 * - prefers-reduced-motion 开启时禁用
 * - 键盘 focus 时不触发位移
 * - 使用 GSAP quickTo 实现平滑动画
 *
 * SSR 安全：
 * - 标记 'use client'
 * - GSAP 在 useEffect 内动态 import
 * - typeof window 防御
 */

interface UseMagneticOptions {
  /** 按钮元素 ref */
  buttonRef: RefObject<HTMLElement | null>;
  /** 是否禁用（例如按钮 disabled 状态） */
  disabled?: boolean;
}

export function useMagnetic({ buttonRef, disabled = false }: UseMagneticOptions) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (disabled) return;

    const button = buttonRef.current;
    if (!button) return;

    // 检查 reduced-motion 偏好
    const reduced = prefersReducedMotion();
    if (reduced) return;

    // 检查是否为 pointer: fine 设备（桌面端）
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    let quickToX: ((value: number) => void) | null = null;
    let quickToY: ((value: number) => void) | null = null;

    (async () => {
      const { default: gsap } = await import('gsap');

      // 创建 quickTo 函数用于平滑位移
      quickToX = gsap.quickTo(button, 'x', {
        duration: MAGNETIC.lerp,
        ease: 'power2.out',
      });
      quickToY = gsap.quickTo(button, 'y', {
        duration: MAGNETIC.lerp,
        ease: 'power2.out',
      });

      const handlePointerMove = (e: PointerEvent) => {
        // 键盘 focus 时不触发（通过检查 pointerType）
        if (e.pointerType === '') return;

        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 计算鼠标到按钮中心的距离
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // 超出磁吸半径则不触发
        if (distance > MAGNETIC.radius) {
          if (quickToX && quickToY) {
            quickToX(0);
            quickToY(0);
          }
          return;
        }

        // 计算位移量（距离越近，位移越大）
        const strength = MAGNETIC.strength;
        const offsetX = deltaX * strength;
        const offsetY = deltaY * strength;

        if (quickToX && quickToY) {
          quickToX(offsetX);
          quickToY(offsetY);
        }
      };

      const handlePointerLeave = () => {
        // 鼠标离开时回到原位
        if (quickToX && quickToY) {
          quickToX(0);
          quickToY(0);
        }
      };

      // 使用 passive 监听器优化性能
      button.addEventListener('pointermove', handlePointerMove, { passive: true });
      button.addEventListener('pointerleave', handlePointerLeave, { passive: true });

      // Cleanup
      return () => {
        button.removeEventListener('pointermove', handlePointerMove);
        button.removeEventListener('pointerleave', handlePointerLeave);
        // 重置位移
        gsap.set(button, { x: 0, y: 0 });
      };
    })();
  }, [buttonRef, disabled]);
}
