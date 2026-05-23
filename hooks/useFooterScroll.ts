'use client';

import { useEffect, RefObject } from 'react';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, SCROLL_TRIGGER } from '@/lib/animations';

/**
 * useFooterScroll - Footer 滚动触发动画 Hook
 *
 * 功能：
 * - 顶部金色细线：scaleX 0 → 1，transformOrigin left center
 * - 大 Logo "HARBOR TABLE"：fade-in + y 上移（整体入场，不拆字符）
 * - 三栏信息（Contact / Hours+Location / Social）：依次淡入 + y 上移，stagger 0.12s
 * - 底部版权行：fade-in + y 上移（轻量，不抢主 Logo）
 * - prefers-reduced-motion 检测：开启时跳过动画，保持静态可见
 * - cleanup：kill 当前 Section 创建的 ScrollTrigger 实例（不影响其他 Section）
 *
 * SSR 安全：
 * - 标记 'use client'
 * - GSAP 和 ScrollTrigger 在 useEffect 内动态 import
 * - typeof window 防御
 */
interface FooterScrollRefs {
  topLine: RefObject<HTMLDivElement | null>;
  logo: RefObject<HTMLDivElement | null>;
  infoColumns: RefObject<HTMLDivElement | null>; // 包含三栏的容器
  copyright: RefObject<HTMLDivElement | null>;
}

export function useFooterScroll(refs: FooterScrollRefs) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { topLine, logo, infoColumns, copyright } = refs;
    const elements = [topLine.current, logo.current, infoColumns.current, copyright.current];
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

      // 1. 顶部金色细线展开：scaleX 0 → 1
      gsap.set(topLine.current, {
        scaleX: 0,
        transformOrigin: 'left center',
      });

      const lineTrigger = ScrollTrigger.create({
        trigger: topLine.current,
        start: SCROLL_TRIGGER.startEarly,
        once: true,
        onEnter: () => {
          gsap.to(topLine.current, {
            scaleX: 1,
            duration: SCROLL_TRIGGER.lineDuration,
            ease: 'expo.out',
          });
        },
      });
      triggers.push(lineTrigger);

      // 2. 大 Logo 入场：fade-in + y 上移（整体入场）
      gsap.set(logo.current, {
        opacity: 0,
        y: SCROLL_TRIGGER.revealYLarge,
      });

      const logoTrigger = ScrollTrigger.create({
        trigger: logo.current,
        start: SCROLL_TRIGGER.startEarly,
        once: true,
        onEnter: () => {
          gsap.to(logo.current, {
            opacity: 1,
            y: 0,
            duration: SCROLL_TRIGGER.cardDuration,
            ease: 'expo.out',
          });
        },
      });
      triggers.push(logoTrigger);

      // 3. 三栏信息入场：依次淡入 + y 上移，stagger 0.12s
      const columnElements = infoColumns.current!.querySelectorAll(':scope > div');
      if (columnElements.length > 0) {
        gsap.set(columnElements, {
          opacity: 0,
          y: SCROLL_TRIGGER.revealYSmall,
        });

        const columnsTrigger = ScrollTrigger.create({
          trigger: infoColumns.current,
          start: SCROLL_TRIGGER.startEarly,
          once: true,
          onEnter: () => {
            gsap.to(columnElements, {
              opacity: 1,
              y: 0,
              duration: SCROLL_TRIGGER.titleDuration,
              stagger: SCROLL_TRIGGER.staggerBase,
              ease: 'expo.out',
            });
          },
        });
        triggers.push(columnsTrigger);
      }

      // 4. 底部版权行入场：跟随三栏信息的 ScrollTrigger，在同一个 trigger 内延迟触发
      gsap.set(copyright.current, {
        opacity: 0,
        y: SCROLL_TRIGGER.revealYShort,
      });

      const copyrightTrigger = ScrollTrigger.create({
        trigger: infoColumns.current,
        start: SCROLL_TRIGGER.startEarly,
        once: true,
        onEnter: () => {
          // 在三栏信息动画开始后 0.5s 触发版权行动画
          gsap.to(copyright.current, {
            opacity: 1,
            y: 0,
            duration: SCROLL_TRIGGER.elementDuration,
            ease: 'expo.out',
            delay: 0.5,
          });
        },
      });
      triggers.push(copyrightTrigger);
    })();

    return () => {
      // cleanup：kill 当前 Section 创建的 ScrollTrigger 实例
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);
}
