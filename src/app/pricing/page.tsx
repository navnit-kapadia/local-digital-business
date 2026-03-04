import Pricing from "@/pages/Pricing";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for small business websites and smart assistants. Professional from $750, Professional Plus from $980. Live in 5 days.",
  openGraph: {
    title: `Pricing | ${SITE_NAME}`,
    description:
      "Fixed pricing for websites and AI assistants. Professional, Professional Plus, and Custom packages. No hidden fees.",
    url: `${SITE_URL}/pricing`,
  },
  alternates: { canonical: `${SITE_URL}/pricing` },
};

export default function PricingPage() {
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Pricing", url: `${SITE_URL}/pricing` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <Pricing />
    </>
  );
}
