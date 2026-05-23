'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useHeroIntro } from '@/hooks/useHeroIntro';

/**
 * Hero Section - 全屏首屏区块
 * 包含背景图、大标题、装饰元素和 CTA 按钮
 * Phase 2A：接入 GSAP + SplitType 入场动画（useHeroIntro）
 */
export default function HeroSection() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useHeroIntro({
    background: backgroundRef,
    topLine: topLineRef,
    title: titleRef,
    subtitle: subtitleRef,
    cta: ctaRef,
    scrollIndicator: scrollIndicatorRef,
  });

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div ref={backgroundRef} className="absolute inset-0 z-0 will-change-transform">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
          alt="Harbor Table restaurant interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 md:px-12">
        {/* Top Decorative Line */}
        <div
          ref={topLineRef}
          className="mb-8 h-px w-24 md:w-32"
          style={{ backgroundColor: 'var(--color-gold)' }}
          data-animate="line-expand"
        />

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-center font-display text-[8vw] font-light leading-none tracking-[0.05em] md:text-[10vw] lg:text-[12vw]"
          style={{
            color: 'var(--color-cream)',
            fontFamily: 'var(--font-display)',
          }}
          data-animate="split-text"
        >
          HARBOR TABLE
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-6 text-center font-body text-sm tracking-[0.3em] md:text-base"
          style={{
            color: 'var(--color-gold)',
            fontFamily: 'var(--font-body)',
          }}
          data-animate="fade-in"
        >
          EST. 2024 — NEW YORK
        </p>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          type="button"
          className="btn-outline-gold mt-12 px-10 py-4 font-body text-sm tracking-[0.2em]"
          aria-label="Reserve a table at Harbor Table"
        >
          RESERVE A TABLE
        </button>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        data-animate="fade-in"
      >
        <span
          className="font-body text-xs tracking-[0.3em]"
          style={{ color: 'var(--color-gold)' }}
        >
          SCROLL
        </span>
        <svg
          width="20"
          height="30"
          viewBox="0 0 20 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-bounce"
        >
          <path
            d="M10 5L10 25M10 25L5 20M10 25L15 20"
            stroke="var(--color-gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
