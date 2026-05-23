/**
 * Site Config — Single source of truth for SEO, Metadata, JSON-LD, sitemap, OG.
 *
 * This is a portfolio demo, NOT a real restaurant.
 * Address / phone / hours are illustrative only.
 */

const FALLBACK_SITE_URL = 'https://harbor-table-nu.vercel.app';

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv && fromEnv.startsWith('http')) {
    return fromEnv.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return FALLBACK_SITE_URL;
}

export const siteConfig = {
  name: 'Harbor Table',
  tagline: 'Modern American Dining',
  description:
    'Experience elevated American cuisine in the heart of New York. Reserve your table at Harbor Table, a modern American restaurant with seasonal tasting menus and harbor-side hospitality.',
  shortDescription:
    'Elevated American cuisine. Seasonal menus. New York harbor-side dining.',
  url: resolveSiteUrl(),
  locale: 'en_US',
  twitterHandle: '@harbortable',
  isDemo: true,
  contact: {
    phone: '+1-212-555-0123',
    phoneDisplay: '(212) 555-0123',
    email: 'reservations@harbortable.com',
  },
  address: {
    street: '123 Harbor Street',
    city: 'New York',
    region: 'NY',
    postalCode: '10013',
    country: 'US',
  },
  geo: {
    latitude: 40.7193,
    longitude: -74.0089,
  },
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '17:00', closes: '22:00' },
    { days: ['Friday', 'Saturday'], opens: '17:00', closes: '23:00' },
  ],
  cuisine: ['American', 'Modern American', 'Seasonal'],
  priceRange: '$$$',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
  },
} as const;

export type SiteConfig = typeof siteConfig;
