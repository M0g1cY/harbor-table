'use client';

import { useRef } from 'react';
import Container from '@/components/ui/Container';
import { useFooterScroll } from '@/hooks/useFooterScroll';

/**
 * Footer - 页脚组件
 * 包含品牌信息、营业时间、地址和社交链接
 * Phase 2B-5：添加 ScrollTrigger 动画
 */
export default function Footer() {
  // Refs for ScrollTrigger animations
  const topLineRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const infoColumnsRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  // Initialize scroll animations
  useFooterScroll({
    topLine: topLineRef,
    logo: logoRef,
    infoColumns: infoColumnsRef,
    copyright: copyrightRef,
  });

  return (
    <footer
      className="relative w-full"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Top Gold Line */}
      <div
        ref={topLineRef}
        className="h-px w-full"
        style={{ backgroundColor: 'var(--color-gold)' }}
        data-animate="line-expand"
      />

      {/* Footer Content */}
      <Container className="py-20">
        {/* Large Logo */}
        <div ref={logoRef} className="mb-16 text-center">
          <h2
            className="font-display text-4xl font-light tracking-wider lg:text-6xl"
            style={{
              color: 'var(--color-cream)',
              fontFamily: 'var(--font-display)',
            }}
          >
            HARBOR TABLE
          </h2>
          <p
            className="mt-4 font-body text-sm tracking-wide"
            style={{ color: 'var(--color-muted)' }}
          >
            Modern American Dining
          </p>
        </div>

        {/* Three Column Grid */}
        <div
          ref={infoColumnsRef}
          className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8"
        >
          {/* Left: Contact */}
          <div className="flex flex-col gap-4">
            <h4
              className="font-body text-xs tracking-[0.3em]"
              style={{ color: 'var(--color-gold)' }}
            >
              CONTACT
            </h4>
            <div
              className="flex flex-col gap-2 font-body text-sm"
              style={{ color: 'var(--color-muted)' }}
            >
              <p>(212) 555-0123</p>
              <p>reservations@harbortable.com</p>
            </div>
          </div>

          {/* Center: Hours & Address */}
          <div className="flex flex-col gap-6">
            <div>
              <h4
                className="mb-3 font-body text-xs tracking-[0.3em]"
                style={{ color: 'var(--color-gold)' }}
              >
                HOURS
              </h4>
              <div
                className="flex flex-col gap-1 font-body text-sm"
                style={{ color: 'var(--color-muted)' }}
              >
                <p>Monday - Thursday: 5PM - 10PM</p>
                <p>Friday - Saturday: 5PM - 11PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div>
              <h4
                className="mb-3 font-body text-xs tracking-[0.3em]"
                style={{ color: 'var(--color-gold)' }}
              >
                LOCATION
              </h4>
              <address
                className="font-body text-sm not-italic"
                style={{ color: 'var(--color-muted)' }}
              >
                123 Harbor Street<br />
                New York, NY 10013
              </address>
            </div>
          </div>

          {/* Right: Social Links */}
          <div className="flex flex-col gap-4">
            <h4
              className="font-body text-xs tracking-[0.3em]"
              style={{ color: 'var(--color-gold)' }}
            >
              FOLLOW US
            </h4>
            <nav className="flex flex-col gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-muted-gold font-body text-sm"
                aria-label="Visit our Instagram page"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-muted-gold font-body text-sm"
                aria-label="Visit our Facebook page"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-muted-gold font-body text-sm"
                aria-label="Visit our Twitter page"
              >
                Twitter
              </a>
            </nav>
          </div>
        </div>
      </Container>

      {/* Copyright */}
      <div
        ref={copyrightRef}
        className="border-t py-6 text-center"
        style={{ borderColor: 'var(--color-surface)' }}
      >
        <p
          className="font-body text-xs tracking-wide"
          style={{ color: 'var(--color-muted)' }}
        >
          © 2024 Harbor Table. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
