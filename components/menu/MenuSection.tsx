'use client';

import { useRef } from 'react';
import MenuCard from './MenuCard';
import Container from '@/components/ui/Container';
import { useMenuScroll } from '@/hooks/useMenuScroll';

/**
 * Menu Section - 菜单展示区块
 * 展示精选菜品卡片
 * Phase 2B-3: 添加 ScrollTrigger 动画
 */
export default function MenuSection() {
  // Refs for ScrollTrigger animation
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // 初始化 Menu 滚动动画
  useMenuScroll({ label: labelRef, title: titleRef, cards: cardsRef });
  const menuItems = [
    {
      name: 'Dry-Aged Ribeye',
      description: '28-day aged, herb butter, seasonal vegetables',
      price: 68,
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80',
    },
    {
      name: 'Atlantic Lobster',
      description: 'Butter poached, lemon risotto, microgreens',
      price: 82,
      image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=600&q=80',
    },
    {
      name: 'Chocolate Soufflé',
      description: 'Dark chocolate, vanilla ice cream, gold leaf',
      price: 24,
      image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80',
    },
  ];

  return (
    <section
      className="relative w-full py-20 pb-32 lg:py-40 lg:pb-48"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <Container>
        {/* Section Label */}
        <p
          ref={labelRef}
          className="mb-8 text-center font-body text-xs tracking-[0.3em]"
          style={{ color: 'var(--color-gold)' }}
        >
          SIGNATURE DISHES
        </p>

        {/* Section Title */}
        <h2
          ref={titleRef}
          className="mb-16 text-center font-display text-[clamp(3rem,6vw,4rem)] font-light tracking-wide lg:mb-20"
          style={{
            color: 'var(--color-cream)',
            fontFamily: 'var(--font-display)',
          }}
        >
          The Menu
        </h2>

        {/* Menu Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <MenuCard key={item.name} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}