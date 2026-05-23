'use client';

import { useEffect, RefObject } from 'react';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, SCROLL_TRIGGER } from '@/lib/animations';

/**
 * useMenuScroll - Menu Section 滚动触发动画 Hook
 *
 * 功能：
 * - Section label "SIGNATURE DISHES"：fade-in + y 上移
 * - 标题 "The Menu"：fade-in + y 上移
 * - 三张菜品卡片：y 80 → 0，opacity 0 → 1，scale 1.05 → 1.0，stagger 0.15s
 * - prefers-reduced-motion 检测：开启时跳过动画，保持静态可见
 * - cleanup：kill 当前 Section 创建的 ScrollTrigger 实例（不影响其他 Section）
 *
 * SSR 安全：
 * - 标记 'use client'
 * - GSAP 和 ScrollTrigger 在 useEffect 内动态 import
 * - typeof window 防御
 */
interface MenuScrollRefs {
  label: RefObject<HTMLParagraphElement | null>;
  title: RefObject<HTMLHeadingElement | null>;
  cards: RefObject<HTMLDivElement | null>; // 包含 3 个 MenuCard 的容器
}

export function useMenuScroll(refs: MenuScrollRefs) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { label, title, cards } = refs;
    const elements = [label.current, title.current, cards.current];
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
        y: SCROLL_TRIGGER.revealYSmall,
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

      // 3. 三张菜品卡片动画：y 80 → 0，opacity 0 → 1，scale 1.05 → 1.0，stagger 0.15s
      const cardElements = cards.current!.querySelectorAll('article');
      if (cardElements.length > 0) {
        gsap.set(cardElements, {
          y: SCROLL_TRIGGER.revealYLong,
          opacity: 0,
          scale: SCROLL_TRIGGER.scaleInitial,
        });

        const cardsTrigger = ScrollTrigger.create({
          trigger: cards.current,
          start: SCROLL_TRIGGER.startLate,
          onEnter: () => {
            gsap.to(cardElements, {
              y: 0,
              opacity: 1,
              scale: 1.0,
              duration: SCROLL_TRIGGER.cardDuration,
              stagger: SCROLL_TRIGGER.staggerLong,
              ease: 'expo.out',
            });
          },
        });
        triggers.push(cardsTrigger);
      }
    })();

    return () => {
      // cleanup：kill 当前 Section 创建的 ScrollTrigger 实例
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);
}

