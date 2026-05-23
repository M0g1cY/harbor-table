'use client';

import { useEffect, RefObject } from 'react';
import type { gsap as GsapType } from 'gsap';
import type SplitTypeLib from 'split-type';
import { DURATION, HERO_INTRO, prefersReducedMotion } from '@/lib/animations';

/**
 * useHeroIntro - Hero Section 入场动画 Hook
 *
 * 功能：
 * - SplitType 拆分标题文字
 * - GSAP timeline 控制：背景图 → 顶部金线 → 标题字符 stagger → subtitle/CTA/scroll 依次入场
 * - prefers-reduced-motion 检测：开启时跳过动画，保持 Hero 静态可见
 * - cleanup：revert SplitType + kill timeline，避免内存泄漏
 *
 * SSR 安全：
 * - 标记 'use client'
 * - GSAP 和 SplitType 在 useEffect 内动态 import
 * - typeof window 防御
 */
interface HeroIntroRefs {
  background: RefObject<HTMLDivElement | null>;
  topLine: RefObject<HTMLDivElement | null>;
  title: RefObject<HTMLHeadingElement | null>;
  subtitle: RefObject<HTMLParagraphElement | null>;
  cta: RefObject<HTMLButtonElement | null>;
  scrollIndicator: RefObject<HTMLDivElement | null>;
}

export function useHeroIntro(refs: HeroIntroRefs) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 解构出 ref 当前值，cleanup 时使用闭包内的快照
    const { background, topLine, title, subtitle, cta, scrollIndicator } = refs;
    const elements = [
      background.current,
      topLine.current,
      title.current,
      subtitle.current,
      cta.current,
      scrollIndicator.current,
    ];
    if (elements.some((el) => !el)) return;

    // 用于 cleanup 的引用
    let split: SplitTypeLib | null = null;
    let timeline: ReturnType<typeof GsapType.timeline> | null = null;

    const reduced = prefersReducedMotion();

    (async () => {
      // 动态 import - 避免 SSR 阶段加载
      const [{ default: gsap }, { default: SplitType }] = await Promise.all([
        import('gsap'),
        import('split-type'),
      ]);

      if (reduced) {
        // 跳过动画，确保所有元素以最终状态可见
        gsap.set(elements, { clearProps: 'all' });
        return;
      }

      // 1. SplitType 拆分标题为字符
      split = new SplitType(title.current!, {
        types: 'chars',
        tagName: 'span',
      });
      const chars = split.chars ?? [];

      // 2. 设置初始状态
      gsap.set(background.current, { scale: 1.1, opacity: 0 });
      gsap.set(topLine.current, { scaleX: 0, transformOrigin: 'left center' });
      if (chars) {
        gsap.set(chars, {
          y: 80,
          opacity: 0,
          clipPath: 'inset(100% 0 0 0)',
          display: 'inline-block',
        });
      }
      gsap.set([subtitle.current, cta.current, scrollIndicator.current], {
        y: 24,
        opacity: 0,
      });

      // 3. 主时间轴
      timeline = gsap.timeline({
        delay: HERO_INTRO.startDelay,
        defaults: { ease: 'expo.out' },
      });

      timeline
        // 背景图慢速放大入场
        .to(background.current, {
          scale: 1.0,
          opacity: 1,
          duration: HERO_INTRO.backgroundDuration,
        })
        // 顶部金色细线展开
        .to(
          topLine.current,
          {
            scaleX: 1,
            duration: HERO_INTRO.detailDuration,
          },
          '-=1.2'
        )
        // 标题字符 stagger 入场
        .to(
          chars,
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            duration: HERO_INTRO.titleDuration,
            stagger: HERO_INTRO.charStagger,
          },
          '-=0.8'
        )
        // subtitle / CTA / scroll indicator 依次淡入
        .to(
          [subtitle.current, cta.current, scrollIndicator.current],
          {
            y: 0,
            opacity: 1,
            duration: DURATION.base,
            stagger: HERO_INTRO.elementStagger,
          },
          '-=0.4'
        );
    })();

    return () => {
      timeline?.kill();
      split?.revert();
    };
  }, [refs]);
}
