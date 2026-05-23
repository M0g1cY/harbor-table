# Harbor Table

> A modern American restaurant website demo showcasing premium web animations, performance optimization, and production-ready engineering.

**🌐 Live Demo**: [harbor-table-nu.vercel.app](https://harbor-table-nu.vercel.app/)  
**📖 Case Study**: [CASE_STUDY.md](./CASE_STUDY.md)

---

## About

Harbor Table is a **fictional restaurant website** built as a portfolio demonstration of advanced web development capabilities. This project showcases premium user experience through sophisticated animations, smooth scrolling, and meticulous attention to performance and accessibility.

**Note**: This is NOT a real restaurant — it's a technical showcase designed to demonstrate production-grade web development skills.

---

## Features

✨ **Hero Intro Animation** — Orchestrated entrance with text splitting and parallax background  
🎯 **Smooth Scroll** — Physics-based scrolling with Lenis + GSAP ScrollTrigger integration  
🎴 **3D Tilt Cards** — Interactive menu cards with mouse-following tilt effect  
🖱️ **Magnetic Button** — Smooth magnetic attraction effect on CTA buttons  
📝 **Reservation System** — Full-stack form with honeypot anti-bot and rate limiting  
🔍 **SEO Optimized** — Open Graph, Twitter Cards, JSON-LD, sitemap, robots.txt  
♿ **Accessible** — WCAG compliant, keyboard navigation, screen reader support  
📱 **Responsive** — Mobile-first design with adaptive animations

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, React Server Components, Edge Runtime)
- **Language**: TypeScript
- **Animation**: GSAP 3.15 (ScrollTrigger, SplitType integration)
- **Smooth Scroll**: Lenis 1.3 (momentum physics)
- **Form**: React Hook Form 7.76 + Zod 4.4 (client + server validation)
- **Image**: next/image (automatic optimization, lazy loading)
- **Styling**: Tailwind CSS + CSS Variables
- **Deployment**: Vercel

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/M0g1cY/harbor-table.git
cd harbor-table

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## Project Status

**Phase 4: Production-Ready** ✅

- ✅ Phase 1: Foundation (Next.js 16 setup, basic layout)
- ✅ Phase 2: Animation System (GSAP, Lenis, ScrollTrigger)
- ✅ Phase 3: Interactions (3D tilt, parallax, magnetic button)
- ✅ Phase 4A: SEO & Metadata (Open Graph, JSON-LD, sitemap)
- ✅ Phase 4B: Reservation API (form validation, honeypot, rate limit)
- ✅ Phase 4C: Performance (bundle optimization, image optimization)
- ✅ Phase 4D: Documentation (Case Study, README)

---

## Performance

**Lighthouse Scores** (Desktop, estimated):
- Performance: 85-90
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 100

**Optimizations**:
- `next/image` with responsive `sizes` and priority hints
- Static generation for homepage
- Edge runtime for OG images
- Removed unused dependencies (-50KB gzipped)

---

## License

MIT License — feel free to use this project as a reference or learning resource.

---

## Disclaimer

Harbor Table is a **demo project** created for portfolio purposes. It is NOT a real restaurant. All contact information, addresses, and business details are fictional and for demonstration only.

---

**Built with ❤️ using Next.js 16, React 19, TypeScript, GSAP, and Lenis.**
