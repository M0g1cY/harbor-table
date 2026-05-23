'use client';

import { useRef, forwardRef } from 'react';
import Image from 'next/image';
import { useTilt } from '@/hooks/useTilt';
import { TILT } from '@/lib/animations';

/**
 * MenuCard - 单个菜品卡片组件
 * Phase 3C: 添加 3D tilt 交互
 *
 * 双层结构避免 transform 冲突：
 * - 外层 wrapper: 交给 useMenuScroll 控制 y / opacity / scale
 * - 内层 surface: 交给 useTilt 控制 rotateX / rotateY
 */
interface MenuCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
}

const MenuCard = forwardRef<HTMLElement, MenuCardProps>(
  ({ name, description, price, image }, ref) => {
    // 内层 tilt surface ref
    const tiltSurfaceRef = useRef<HTMLDivElement>(null);

    // 应用 3D tilt 效果到内层
    useTilt({ cardRef: tiltSurfaceRef });

    return (
      <article
        ref={ref}
        className="group relative flex flex-col"
        style={{ perspective: `${TILT.perspective}px` }}
      >
        {/* 内层 Tilt Surface */}
        <div
          ref={tiltSurfaceRef}
          className="flex flex-col"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Image Container with 4:5 aspect ratio */}
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3 py-6 pb-8">
            <h3
              className="font-display text-2xl font-light tracking-wide lg:text-3xl"
              style={{
                color: 'var(--color-cream)',
                fontFamily: 'var(--font-display)',
              }}
            >
              {name}
            </h3>

            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              {description}
            </p>

            <div
              className="mt-2 text-right font-body text-xl font-light tracking-wider"
              style={{ color: 'var(--color-gold)' }}
            >
              ${price}
            </div>
          </div>
        </div>
      </article>
    );
  }
);

MenuCard.displayName = 'MenuCard';

export default MenuCard;