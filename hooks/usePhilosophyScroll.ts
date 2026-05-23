'use client';

import { useEffect, RefObject } from 'react';
import type { gsap as GsapType } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, SCROLL_TRIGGER } from '@/lib/animations';

/**
 * usePhilosophyScroll - Philosophy Section 滚动触发动画 Hook
 *
 * 功能：
 * - 大引言：opacity 0.15 → 1，blur(8px) → blur(0px)，y 40 → 0，scrub: 1
 * - 左侧 3 个 article：x -40 → 0，opacity 0 → 1，stagger 0.15s
 * - 右侧图片：轻微 y parallax（-40px → 40px），scrub: 2
 * - prefers-reduced-motion 检测：开启时跳过动画，保持静态可见
 * - cleanup：kill 当前 Section 创建的 ScrollTrigger 实例（不影响其他 Section）
 *
 * SSR 安全：
 * - 标记 'use client'
 * - GSAP 和 ScrollTrigger 在 useEffect 内动态 import
 * - typeof window 防御
 */
interface PhilosophyScrollRefs {
  quote: RefObject<HTMLQuoteElement | null>;
  articles: RefObject<HTMLDivElement | null>; // 包含 3 个 article 的容器
  image: RefObject<HTMLDivElement | null>;
}

export function usePhilosophyScroll(refs: PhilosophyScrollRefs) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { quote, articles, image } = refs;
    const elements = [quote.current, articles.current, image.current];
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

      // 1. 大引言动画：opacity + blur + y，scrub 跟随滚动
      gsap.set(quote.current, {
        opacity: 0.15,
        filter: `blur(${SCROLL_TRIGGER.blurInitial}px)`,
        y: SCROLL_TRIGGER.revealYBase,
      });

      const quoteTrigger = ScrollTrigger.create({
        trigger: quote.current,
        start: SCROLL_TRIGGER.startDefault,
        end: 'top 30%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(quote.current, {
            opacity: 0.15 + progress * 0.85, // 0.15 → 1
            filter: `blur(${SCROLL_TRIGGER.blurInitial * (1 - progress)}px)`, // 8px → 0px
            y: SCROLL_TRIGGER.revealYBase * (1 - progress), // 40 → 0
          });
        },
      });
      triggers.push(quoteTrigger);

      // 2. 左侧 3 个 article：x -40 → 0，opacity 0 → 1，stagger 0.15s
      const articleElements = articles.current!.querySelectorAll('article');
      if (articleElements.length > 0) {
        gsap.set(articleElements, {
          x: -SCROLL_TRIGGER.revealXBase,
          opacity: 0,
        });

        const articleTrigger = ScrollTrigger.create({
          trigger: articles.current,
          start: SCROLL_TRIGGER.startMid,
          onEnter: () => {
            gsap.to(articleElements, {
              x: 0,
              opacity: 1,
              duration: SCROLL_TRIGGER.elementDuration,
              stagger: SCROLL_TRIGGER.staggerLong,
              ease: 'expo.out',
            });
          },
        });
        triggers.push(articleTrigger);
      }

      // 3. 右侧图片：轻微 y parallax（-40px → 40px），scrub: 2
      gsap.set(image.current, { y: -SCROLL_TRIGGER.parallaxRange / 2 });

      const imageTrigger = ScrollTrigger.create({
        trigger: image.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(image.current, {
            y: -SCROLL_TRIGGER.parallaxRange / 2 + progress * SCROLL_TRIGGER.parallaxRange, // -40px → 40px
          });
        },
      });
      triggers.push(imageTrigger);
    })();

    return () => {
      // cleanup：kill 当前 Section 创建的 ScrollTrigger 实例
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);
}

