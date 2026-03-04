import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Comparison from "@/components/Comparison";
import HowItWorks from "@/components/HowItWorks";
import WhatYouGet from "@/components/WhatYouGet";
import WhoWeServe from "@/components/WhoWeServe";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
  buildFAQSchema,
  buildServiceSchema,
  LOCAL_BUSINESS_SCHEMA,
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
} from "@/lib/seo";

const HOME_FAQS = [
  {
    question: "How much does it cost?",
    answer: "We offer fixed, upfront pricing. No surprises.",
  },
  {
    question: "How long does it take?",
    answer: "Most websites are live within 5 days.",
  },
  {
    question: "Do I need to know anything about tech?",
    answer: "No. We handle the setup from start to finish.",
  },
  {
    question: "What happens after it goes live?",
    answer:
      "We offer ongoing hosting and maintenance from $39.99/month so everything stays running smoothly without you lifting a finger.",
  },
];

export const metadata = {
  title: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — Get Found. Get Booked. 24/7.`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },
  alternates: { canonical: SITE_URL },
};

export default function Home() {
  const faqSchema = buildFAQSchema(HOME_FAQS);
  const serviceSchema = buildServiceSchema();

  return (
    <>
      <JsonLd data={[faqSchema, LOCAL_BUSINESS_SCHEMA, serviceSchema]} />
      <div className="min-h-screen">
        <Navbar />
        <main id="main-content" className="pt-16" role="main">
          <Hero />
          <Comparison />
          <HowItWorks />
          <WhatYouGet />
          <WhoWeServe />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
