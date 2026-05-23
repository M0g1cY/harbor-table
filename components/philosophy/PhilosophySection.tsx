'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { usePhilosophyScroll } from '@/hooks/usePhilosophyScroll';

/**
 * Philosophy Section - 品牌理念区块
 * 包含大号引言、品牌故事和竖版图片
 *
 * Phase 2B-2 增强：
 * - 大引言：opacity + blur + y 滚动触发动画
 * - 左侧 3 个 article：x + opacity stagger 入场
 * - 右侧图片：轻微 y parallax
 */
export default function PhilosophySection() {
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  usePhilosophyScroll({
    quote: quoteRef,
    articles: articlesRef,
    image: imageRef,
  });

  return (
    <section
      className="relative w-full py-20 lg:py-40"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <Container>
        {/* Section Label */}
        <p
          className="mb-8 text-center font-body text-xs tracking-[0.3em]"
          style={{ color: 'var(--color-gold)' }}
          data-animate="fade-in"
        >
          PHILOSOPHY
        </p>

        {/* Brand Quote */}
        <blockquote
          ref={quoteRef}
          className="mb-24 text-center font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight lg:mb-32"
          style={{
            color: 'var(--color-cream)',
            fontFamily: 'var(--font-display)',
          }}
          data-animate="fade-in"
        >
          Where culinary artistry meets timeless elegance,<br />
          creating unforgettable dining moments<br />
          in the heart of New York.
        </blockquote>

        {/* Grid Layout with explicit column spans */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Left: Brand Stories */}
          <div ref={articlesRef} className="flex flex-col gap-12 lg:col-span-5">
            <article data-animate="fade-in">
              <h3
                className="mb-4 font-display text-2xl font-light tracking-wide lg:text-3xl"
                style={{ color: 'var(--color-gold)' }}
              >
                Our Philosophy
              </h3>
              <p
                className="font-body text-base leading-relaxed"
                style={{ color: 'var(--color-muted)' }}
              >
                At Harbor Table, we believe that dining is more than sustenance—it&apos;s
                an experience that engages all the senses. Every dish is crafted with
                precision, using only the finest seasonal ingredients sourced from
                local farms and trusted purveyors.
              </p>
            </article>

            <article data-animate="fade-in">
              <h3
                className="mb-4 font-display text-2xl font-light tracking-wide lg:text-3xl"
                style={{ color: 'var(--color-gold)' }}
              >
                The Art of Hospitality
              </h3>
              <p
                className="font-body text-base leading-relaxed"
                style={{ color: 'var(--color-muted)' }}
              >
                Our team is dedicated to creating an atmosphere of warmth and
                sophistication. From the moment you step through our doors, you&apos;re
                welcomed into a space where every detail has been thoughtfully
                considered to ensure your comfort and delight.
              </p>
            </article>

            <article data-animate="fade-in">
              <h3
                className="mb-4 font-display text-2xl font-light tracking-wide lg:text-3xl"
                style={{ color: 'var(--color-gold)' }}
              >
                A Culinary Journey
              </h3>
              <p
                className="font-body text-base leading-relaxed"
                style={{ color: 'var(--color-muted)' }}
              >
                Our menu is a celebration of modern American cuisine, blending
                traditional techniques with innovative approaches. Each plate tells
                a story, inviting you to explore flavors that are both familiar and
                surprising, rooted in tradition yet boldly contemporary.
              </p>
            </article>
          </div>

          {/* Right: Vertical Image */}
          <div
            ref={imageRef}
            className="relative aspect-[4/5] lg:col-span-6 lg:col-start-7"
            data-animate="fade-in"
          >
            <Image
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
              alt="Harbor Table dining experience"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}