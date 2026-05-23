# Harbor Table

A modern, animated restaurant website built with Next.js 15, featuring smooth scroll animations, interactive micro-interactions, and form validation.

**Live Demo**: https://harbor-table-nu.vercel.app/

---

## Project Status

✅ **Phase 1**: Foundation (Completed)  
✅ **Phase 2**: Animations (Completed)  
✅ **Phase 3**: Interactive Enhancements (Completed)

---

## Features

### Core Features
- **Responsive Design** - Mobile-first, optimized for all screen sizes
- **Smooth Scrolling** - Lenis smooth scroll on desktop (pointer: fine)
- **Dark Theme** - Awwwards-inspired dark aesthetic
- **Accessibility** - ARIA attributes, focus-visible, keyboard navigation

### Animations (Phase 2)
- **Hero Intro** - GSAP + SplitType character stagger animation
- **ScrollTrigger** - Section-by-section reveal animations
- **Philosophy Parallax** - Image parallax on scroll
- **Menu Cards** - Stagger entrance with scale effect
- **Reservation Form** - Field-by-field reveal
- **Footer** - Line expand + content fade-in

### Interactive Enhancements (Phase 3)
- **Form Validation** - React Hook Form + Zod schema validation
- **Magnetic Button** - Hero CTA and Reservation Submit with magnetic effect
- **Menu 3D Tilt** - Card tilt on mouse move (pointer: fine)
- **Footer Micro-interactions** - Social link underline animation + Logo letter-spacing
- **Hero Parallax** - Mouse-driven background/title parallax (after intro)

### Graceful Degradation
- **prefers-reduced-motion** - All animations disabled or static
- **pointer: coarse** - Touch-friendly, no hover-dependent interactions
- **Mobile-first** - Native scroll, no Lenis on mobile

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Animations**: GSAP + ScrollTrigger + SplitType
- **Smooth Scroll**: Lenis (desktop only)
- **Form**: React Hook Form + Zod
- **Fonts**: Playfair Display + Inter (next/font)
- **Deployment**: Vercel

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/harbor-table.git
cd harbor-table

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
# Production build
npm run build

# Start production server
npm start
```

---

## Project Structure

```
harbor-table/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── hero/             # Hero section
│   ├── philosophy/       # Philosophy section
│   ├── menu/             # Menu section
│   ├── reservation/      # Reservation section
│   ├── footer/           # Footer
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
│   ├── useHeroIntro.ts   # Hero intro animation
│   ├── useHeroParallax.ts # Hero mouse parallax
│   ├── useMagnetic.ts    # Magnetic button effect
│   ├── useTilt.ts        # 3D tilt effect
│   └── use*Scroll.ts     # ScrollTrigger hooks
├── lib/                  # Utilities
│   ├── animations.ts     # Animation constants
│   └── reservationSchema.ts # Form validation schema
└── public/               # Static assets
```

---

## Roadmap

### ✅ Phase 1: Foundation
- [x] Project setup (Next.js 15 + TypeScript + Tailwind)
- [x] Design system (colors, typography, spacing)
- [x] Component structure (Hero, Philosophy, Menu, Reservation, Footer)
- [x] Responsive layout
- [x] Accessibility baseline

### ✅ Phase 2: Animations
- [x] Lenis smooth scroll integration
- [x] Hero intro animation (GSAP + SplitType)
- [x] ScrollTrigger for all sections
- [x] Philosophy image parallax
- [x] Menu card stagger entrance
- [x] Reservation form reveal
- [x] Footer line expand

### ✅ Phase 3: Interactive Enhancements
- [x] Phase 3A: Reservation form validation (RHF + Zod)
- [x] Phase 3B: Magnetic Button (Hero CTA + Reservation Submit)
- [x] Phase 3C: Menu card 3D tilt
- [x] Phase 3D: Footer micro-interactions
- [x] Phase 3E: Hero mouse parallax

### 🔮 Future Enhancements
- [ ] Backend integration (form submission API)
- [ ] CMS integration (menu items, content management)
- [ ] Performance optimization (image lazy loading, font subsetting)
- [ ] SEO optimization (metadata, structured data)
- [ ] Analytics integration (Google Analytics, Vercel Analytics)

---

## Documentation

- [Phase 2 Report](PHASE2_REPORT.md) - Animation implementation details
- [Phase 3 Report](PHASE3_REPORT.md) - Interactive enhancements details
- [Project Spec](PROJECT_SPEC.md) - Full project specification

---

## License

This project is for portfolio demonstration purposes.

---

## Acknowledgments

- Design inspiration: Awwwards
- Fonts: Google Fonts (Playfair Display, Inter)
- Images: Unsplash
- Animations: GSAP, SplitType, Lenis
