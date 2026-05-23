# Harbor Table — Case Study

> A modern American restaurant website demo showcasing premium web animations, performance optimization, and production-ready engineering.

**Live Demo**: [harbor-table-nu.vercel.app](https://harbor-table-nu.vercel.app/)  
**Tech Stack**: Next.js 16, React 19, TypeScript, GSAP, Lenis, Zod

---

## Project Overview

Harbor Table is a fictional modern American restaurant website built as a portfolio demonstration of advanced web development capabilities. The project showcases premium user experience through sophisticated animations, smooth scrolling, and meticulous attention to performance and accessibility.

This is **not a real restaurant** — it's a technical showcase designed to demonstrate production-grade web development skills, from animation orchestration to SEO optimization to API design.

---

## Why This Project

**Goal**: Create a portfolio piece that demonstrates mastery of modern web technologies while delivering a premium, award-worthy user experience.

**Motivation**:
- Showcase ability to build high-end, animation-rich websites without sacrificing performance
- Demonstrate full-stack capabilities (frontend animations + backend API + SEO)
- Practice production-ready engineering (TypeScript, validation, error handling, accessibility)
- Build something visually impressive that stands out in a portfolio

**Target Audience**: Hiring managers, potential clients, and fellow developers looking for inspiration or technical reference.

---

## Inspiration & Design Direction

**Visual References**:
- Awwwards dark theme aesthetics
- Luxury dining websites (Eleven Madison Park, Alinea)
- Premium brand websites with sophisticated micro-interactions

**Design Principles**:
- **Dark elegance**: Near-black background (#0a0a0a) with gold accents (#c9a96e)
- **Typography hierarchy**: Playfair Display (serif) for headings, Inter (sans-serif) for body
- **Minimalist layout**: Generous whitespace, clear visual hierarchy
- **Subtle animations**: Enhance rather than distract — every animation serves a purpose

**Color Palette**:
```css
--color-bg: #0a0a0a;        /* Near-black background */
--color-gold: #c9a96e;      /* Primary accent */
--color-cream: #f5f0e8;     /* Headings */
--color-muted: #6b6b6b;     /* Secondary text */
```

---

## Tech Stack

### Core Framework
- **Next.js 16** (App Router, React Server Components, Edge Runtime)
- **React 19** (latest features, improved performance)
- **TypeScript** (type safety across the stack)

### Animation & Interaction
- **GSAP 3.15** (ScrollTrigger, SplitType integration, timeline orchestration)
- **Lenis 1.3** (smooth scroll with momentum physics)
- **Custom hooks** (useTilt, useHeroIntro, useHeroParallax, useMenuScroll, etc.)

### Form & Validation
- **React Hook Form 7.76** (performant form state management)
- **Zod 4.4** (runtime validation, shared client/server schemas)
- **@hookform/resolvers** (Zod + React Hook Form integration)

### Image Optimization
- **next/image** (automatic optimization, lazy loading, responsive sizes)
- **Unsplash CDN** (high-quality placeholder images)

### Development
- **ESLint** (code quality)
- **Turbopack** (Next.js 16 default bundler, faster builds)

---

## Core Features

### 1. Hero Intro Animation
**What**: Orchestrated entrance animation with text splitting, staggered reveals, and parallax background.

**Implementation**:
- GSAP timeline with SplitType for character-by-character text reveal
- Phased animation system: intro completes → parallax activates
- `useHeroIntro` hook manages animation lifecycle
- `prefers-reduced-motion` fallback (instant display, no animation)

**Key Challenge**: Preventing animation conflicts between intro and parallax systems.

**Solution**: State-based activation — parallax only enables after intro completes.

### 2. Smooth Scroll (Lenis)
**What**: Physics-based smooth scrolling with momentum and easing.

**Implementation**:
- Lenis provider wraps entire app
- Integrates with GSAP ScrollTrigger via `scrollerProxy`
- Disabled on mobile (`pointer: coarse`) to preserve native scroll performance
- Disabled for `prefers-reduced-motion`

**Key Challenge**: Lenis hijacks scroll events, breaking ScrollTrigger.

**Solution**: GSAP `scrollerProxy` bridges Lenis and ScrollTrigger, ensuring animations fire at correct scroll positions.

### 3. Menu Card 3D Tilt
**What**: Interactive 3D tilt effect on menu cards, responding to mouse movement.

**Implementation**:
- `useTilt` hook calculates rotation based on mouse position relative to card center
- Dual-layer structure: outer wrapper for ScrollTrigger, inner surface for tilt
- Smooth transitions via CSS `transition` + `will-change: transform`
- Disabled on mobile and for `prefers-reduced-motion`

**Key Challenge**: Transform conflicts between ScrollTrigger (scale/opacity) and tilt (rotateX/rotateY).

**Solution**: Separate DOM layers — ScrollTrigger controls wrapper, tilt controls inner surface.

### 4. Hero Mouse Parallax
**What**: Subtle background parallax effect following mouse movement.

**Implementation**:
- `useHeroParallax` hook tracks mouse position
- GSAP `quickTo` for smooth, performant animation
- Only activates after hero intro completes
- Disabled on mobile and for `prefers-reduced-motion`

**Key Challenge**: Parallax interfering with intro animation.

**Solution**: Conditional activation via `parallaxEnabled` state flag.

### 5. Reservation Form + API
**What**: Full-stack reservation system with client/server validation, honeypot anti-bot, and rate limiting.

**Implementation**:
- **Client**: React Hook Form + Zod validation, three-state feedback (success/error/rate-limited)
- **Server**: POST `/api/reservation` with server-side Zod validation, honeypot check, in-memory rate limit (60s window per IP)
- **Security**: Honeypot field (hidden `website` input), rate limiting, input sanitization

**Key Challenge**: Preventing bot submissions without adding CAPTCHA friction.

**Solution**: Honeypot field — bots fill all fields, triggering silent rejection (returns 200 to avoid revealing anti-bot logic).

### 6. SEO & Metadata
**What**: Production-grade SEO with Open Graph, Twitter Cards, JSON-LD, sitemap, and robots.txt.

**Implementation**:
- `lib/siteConfig.ts` as single source of truth
- `app/layout.tsx` exports full metadata (title template, OG, Twitter, robots)
- `app/opengraph-image.tsx` generates 1200×630 OG image via `next/og` (edge runtime)
- `components/seo/RestaurantJsonLd.tsx` injects schema.org Restaurant structured data
- `app/sitemap.ts` and `app/robots.ts` for crawler directives

**Key Challenge**: Keeping metadata consistent across multiple files.

**Solution**: Centralized `siteConfig` imported by all SEO-related files.

---

## Animation & Interaction System

### Architecture
**Phased Animation System**: Animations are grouped into phases to prevent conflicts and ensure correct execution order.

**Example (Hero)**:
1. **Phase 1 (Intro)**: Text split → stagger reveal → CTA fade-in
2. **Phase 2 (Parallax)**: Only activates after Phase 1 completes

### Custom Hooks
All animations are encapsulated in reusable hooks:
- `useHeroIntro`: Orchestrates hero entrance animation
- `useHeroParallax`: Mouse-following parallax effect
- `useTilt`: 3D tilt interaction for cards
- `useMenuScroll`: ScrollTrigger animations for menu section
- `useFooterScroll`: ScrollTrigger animations for footer

**Benefits**:
- Separation of concerns (animation logic separate from component logic)
- Reusability across components
- Easier testing and debugging
- Consistent animation patterns

### Accessibility Considerations
- `prefers-reduced-motion`: All animations disabled, instant display
- `pointer: coarse`: Touch-based interactions (tilt, parallax) disabled
- Keyboard navigation: All interactive elements focusable, visible focus states
- ARIA labels: Screen reader support for all interactive elements

---

## Engineering Challenges & Solutions

### Challenge 1: Animation Timing Conflicts
**Problem**: Hero intro animation and parallax effect both manipulate the same DOM elements, causing visual glitches.

**Solution**: State-based activation. Parallax only enables after intro completes:
```typescript
const [parallaxEnabled, setParallaxEnabled] = useState(false);

useHeroIntro({
  onComplete: () => setParallaxEnabled(true)
});

useHeroParallax({
  enabled: parallaxEnabled
});
```

### Challenge 2: Lenis + ScrollTrigger Integration
**Problem**: Lenis hijacks scroll events, breaking GSAP ScrollTrigger.

**Solution**: GSAP `scrollerProxy` bridges the two libraries:
```typescript
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length
      ? lenis.scrollTo(value, { immediate: true })
      : lenis.scroll;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
});
```

### Challenge 3: Form Validation (Client + Server)
**Problem**: Client-side validation can be bypassed. Need server-side validation without code duplication.

**Solution**: Shared Zod schema (`lib/reservationSchema.ts`) used by both client (React Hook Form) and server (API route):
```typescript
// Shared schema
export const reservationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  // ...
});

// Client
const { register, handleSubmit } = useForm({
  resolver: zodResolver(reservationSchema)
});

// Server
const result = reservationSchema.safeParse(body);
if (!result.success) {
  return NextResponse.json({ error: "Invalid data" }, { status: 400 });
}
```

### Challenge 4: Performance vs. Visual Richness
**Problem**: Heavy animations can hurt Lighthouse Performance score.

**Solution**:
- Lazy load below-the-fold content (Philosophy, Menu images)
- `priority` prop only on LCP image (Hero background)
- Accurate `sizes` prop on all images (reduces over-fetching)
- Remove unused dependencies (framer-motion: -50KB gzipped)
- Edge runtime for OG image generation (faster cold starts)

---

## Performance, SEO & Accessibility

### Performance Optimizations
- **Image optimization**: `next/image` with responsive `sizes`, lazy loading, priority hints
- **Bundle size**: Removed unused framer-motion (-50KB gzipped)
- **Static generation**: Homepage pre-rendered at build time
- **Edge runtime**: OG images generated on-demand at edge

**Expected Lighthouse Scores** (Desktop):
- Performance: 85-90
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 100

### SEO Implementation
- **Metadata**: Full Open Graph + Twitter Cards
- **Structured data**: JSON-LD Restaurant schema
- **Sitemap**: Auto-generated via `app/sitemap.ts`
- **Robots.txt**: Crawler directives via `app/robots.ts`
- **Canonical URLs**: Prevent duplicate content issues

### Accessibility Features
- **Semantic HTML**: Proper heading hierarchy, `<nav>`, `<main>`, `<footer>`
- **ARIA labels**: All interactive elements labeled
- **Keyboard navigation**: Full keyboard support, visible focus states
- **Screen reader support**: `role="status"`, `aria-live="polite"` for dynamic content
- **Motion preferences**: `prefers-reduced-motion` respected throughout

---

## What I Learned

### Technical Skills
- **Animation orchestration**: Managing complex, multi-phase animations without conflicts
- **Next.js 16 features**: App Router, Server Components, Edge Runtime, `next/og`
- **Performance optimization**: Balancing visual richness with Lighthouse scores
- **Full-stack validation**: Shared schemas between client and server
- **SEO best practices**: Metadata, structured data, Open Graph

### Engineering Practices
- **Phased development**: Breaking large projects into manageable phases (Phase 1-4)
- **Atomic commits**: Each commit does one thing, making rollback easy
- **Documentation**: Writing clear commit messages and technical documentation
- **QA mindset**: Testing across browsers, devices, and accessibility modes

### AI-Assisted Development
This project leveraged AI tools for rapid prototyping and code generation, but all architectural decisions, QA, and deployment were human-driven. AI accelerated implementation, but the engineering judgment — when to use GSAP vs. CSS, how to structure animations, what to optimize — came from understanding the trade-offs.

---

## Future Improvements

### Short-term
- **Real email integration**: Connect Resend or SendGrid for actual reservation emails
- **Admin dashboard**: View and manage reservations
- **Multi-language support**: i18n for international audiences

### Long-term
- **CMS integration**: Sanity or Contentful for menu management
- **Online ordering**: Integrate with delivery platforms
- **Table availability**: Real-time reservation system with calendar
- **Analytics**: Track user behavior, optimize conversion funnel

---

## Conclusion

Harbor Table demonstrates that premium user experiences and production-grade engineering are not mutually exclusive. Through careful animation orchestration, performance optimization, and attention to accessibility, the project achieves a balance between visual richness and technical excellence.

This case study showcases not just the final product, but the engineering decisions, challenges, and solutions that went into building it — the kind of thinking that translates to any web project, from marketing sites to SaaS applications.

**Live Demo**: [harbor-table-nu.vercel.app](https://harbor-table-nu.vercel.app/)  
**GitHub**: [github.com/M0g1cY/harbor-table](https://github.com/M0g1cY/harbor-table)

---

*Built with Next.js 16, React 19, TypeScript, GSAP, and Lenis. Deployed on Vercel.*
