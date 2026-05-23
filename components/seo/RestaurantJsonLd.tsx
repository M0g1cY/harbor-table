import { siteConfig } from "@/lib/siteConfig";

/**
 * Restaurant JSON-LD structured data.
 *
 * NOTE: Harbor Table is a portfolio demo, not a real business.
 * Address, phone, geo, and hours are illustrative. The "isAccessibleForFree"
 * and "@id" fields are kept stable to prevent duplicate-entity ambiguity.
 *
 * Validate with: https://search.google.com/test/rich-results
 */
export default function RestaurantJsonLd() {
  const dayMap: Record<string, string> = {
    Monday: "Mo",
    Tuesday: "Tu",
    Wednesday: "We",
    Thursday: "Th",
    Friday: "Fr",
    Saturday: "Sa",
    Sunday: "Su",
  };

  const openingHoursSpecification = siteConfig.hours.map((slot) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: slot.days.map((d) => `https://schema.org/${d}`),
    opens: slot.opens,
    closes: slot.closes,
  }));

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteConfig.url}/#restaurant`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/opengraph-image`,
    servesCuisine: [...siteConfig.cuisine],
    priceRange: siteConfig.priceRange,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification,
    openingHours: siteConfig.hours.map((slot) => {
      const days = slot.days.map((d) => dayMap[d]).join(",");
      return `${days} ${slot.opens}-${slot.closes}`;
    }),
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.twitter,
    ],
    acceptsReservations: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
