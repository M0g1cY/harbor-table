'use client';

import Image from 'next/image';

/**
 * MenuCard - 单个菜品卡片组件
 */
interface MenuCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function MenuCard({ name, description, price, image }: MenuCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden">
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
      <div className="flex flex-col gap-3 py-6">
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
    </article>
  );
}