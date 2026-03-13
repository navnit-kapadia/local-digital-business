import Contact from "@/pages/Contact";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Local Digital Business. Melbourne, Australia. Book a free chat or send a message about your website and smart assistant needs.",
  openGraph: {
    title: `Contact | ${SITE_NAME}`,
    description:
      "Contact us for a free chat. We build websites and smart assistants for solopreneurs and small businesses in Australia.",
    url: `${SITE_URL}/contact`,
  },
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Contact", url: `${SITE_URL}/contact` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <Contact />
    </>
  );
}
