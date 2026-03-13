/**
 * SEO & AEO (Answer Engine Optimization) config and structured data.
 * 100% standards-aligned: schema.org, Open Graph, Twitter Cards, meta best practices.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://localdigitalbusiness.com.au";

export const SITE_NAME = "Local Digital Business";
export const DEFAULT_DESCRIPTION =
  "Simple websites and smart AI assistants for solopreneurs and small businesses in Australia. Live in 5 days, fixed pricing. SEO and AEO ready.";
export const DEFAULT_TITLE = `${SITE_NAME} — Websites & AI Assistants for Small Businesses`;
export const LOCALE = "en_AU";
export const LOCALE_ALT = "en-AU";

export const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: DEFAULT_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressCountry: "AU",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "sshah@localdigitalbusiness.com.au",
    contactType: "customer service",
    areaServed: "AU",
    availableLanguage: "English",
  },
  sameAs: [],
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: LOCALE_ALT,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", url: `${SITE_URL}/contact` },
    "query-input": "required name=query",
  },
};

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  email: "sshah@localdigitalbusiness.com.au",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
  areaServed: { "@type": "Country", name: "Australia" },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
};

export function buildFAQSchema(
  faqs: { question: string; answer: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    name: "Website and Smart Assistant for Small Business",
    description:
      "Professional one-page and multi-page websites with optional 24/7 AI assistant for solopreneurs and small businesses. Fixed pricing, live in 5 days. Includes SEO and AEO setup.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Australia" },
    serviceType: ["Web Design", "SEO", "AI Assistant", "Digital Marketing"],
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
