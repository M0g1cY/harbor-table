'use client';

import { useEffect, RefObject } from 'react';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, SCROLL_TRIGGER } from '@/lib/animations';

/**
 * useReservationScroll - Reservation Section 滚动触发动画 Hook
 *
 * 功能：
 * - Section label "RESERVATIONS"：fade-in + y 上移
 * - 标题 "Join Us"：fade-in + y 上移
 * - 表单字段（Name / Email / Date / Party Size / Special Requests / Submit Button）：依次入场，stagger 0.1s
 * - 右侧信息区（Reservation note / hours / private dining）：淡入 + x 右移，stagger 0.12s
 * - prefers-reduced-motion 检测：开启时跳过动画，保持静态可见
 * - cleanup：kill 当前 Section 创建的 ScrollTrigger 实例（不影响其他 Section）
 *
 * SSR 安全：
 * - 标记 'use client'
 * - GSAP 和 ScrollTrigger 在 useEffect 内动态 import
 * - typeof window 防御
 */
interface ReservationScrollRefs {
  label: RefObject<HTMLParagraphElement | null>;
  title: RefObject<HTMLHeadingElement | null>;
  formFields: RefObject<HTMLFormElement | null>; // 包含所有表单字段的 form 容器
  infoBlocks: RefObject<HTMLDivElement | null>; // 包含 3 个信息块的容器
}

export function useReservationScroll(refs: ReservationScrollRefs) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { label, title, formFields, infoBlocks } = refs;
    const elements = [label.current, title.current, formFields.current, infoBlocks.current];
    if (elements.some((el) => !el)) return;

    // 用于 cleanup 的 ScrollTrigger 实例数组
    const triggers: InstanceType<typeof ScrollTriggerType>[] = [];

    const reduced = prefersReducedMotion();

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      // 注册 ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      if (reduced) {
        // 跳过动画，确保所有元素以最终状态可见
        gsap.set(elements, { clearProps: 'all' });
        return;
      }

      // 1. Section label 动画：fade-in + y 上移
      gsap.set(label.current, {
        opacity: 0,
        y: SCROLL_TRIGGER.revealYBase,
      });

      const labelTrigger = ScrollTrigger.create({
        trigger: label.current,
        start: SCROLL_TRIGGER.startDefault,
        onEnter: () => {
          gsap.to(label.current, {
            opacity: 1,
            y: 0,
            duration: SCROLL_TRIGGER.labelDuration,
            ease: 'expo.out',
          });
        },
      });
      triggers.push(labelTrigger);

      // 2. 标题动画：fade-in + y 上移
      gsap.set(title.current, {
        opacity: 0,
        y: SCROLL_TRIGGER.revealYBase,
      });

      const titleTrigger = ScrollTrigger.create({
        trigger: title.current,
        start: SCROLL_TRIGGER.startDefault,
        onEnter: () => {
          gsap.to(title.current, {
            opacity: 1,
            y: 0,
            duration: SCROLL_TRIGGER.titleDuration,
            ease: 'expo.out',
          });
        },
      });
      triggers.push(titleTrigger);

      // 3. 表单字段动画：依次入场，stagger 0.1s
      // 选择所有表单字段容器（.flex.flex-col.gap-2）和提交按钮
      const formFieldElements = formFields.current!.querySelectorAll('.flex.flex-col.gap-2, button[type="submit"]');
      if (formFieldElements.length > 0) {
        gsap.set(formFieldElements, {
          opacity: 0,
          y: SCROLL_TRIGGER.revealYSmall,
        });

        const formTrigger = ScrollTrigger.create({
          trigger: formFields.current,
          start: SCROLL_TRIGGER.startLate,
          onEnter: () => {
            gsap.to(formFieldElements, {
              opacity: 1,
              y: 0,
              duration: SCROLL_TRIGGER.elementDuration,
              stagger: SCROLL_TRIGGER.staggerShort,
              ease: 'expo.out',
            });
          },
        });
        triggers.push(formTrigger);
      }

      // 4. 右侧信息区动画：淡入 + x 右移，stagger 0.12s
      const infoBlockElements = infoBlocks.current!.querySelectorAll('div > div');
      if (infoBlockElements.length > 0) {
        gsap.set(infoBlockElements, {
          opacity: 0,
          x: SCROLL_TRIGGER.revealXBase,
        });

        const infoTrigger = ScrollTrigger.create({
          trigger: infoBlocks.current,
          start: SCROLL_TRIGGER.startLate,
          onEnter: () => {
            gsap.to(infoBlockElements, {
              opacity: 1,
              x: 0,
              duration: SCROLL_TRIGGER.titleDuration,
              stagger: SCROLL_TRIGGER.staggerBase,
              ease: 'expo.out',
            });
          },
        });
        triggers.push(infoTrigger);
      }
    })();

    return () => {
      // cleanup：kill 当前 Section 创建的 ScrollTrigger 实例
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);
}

