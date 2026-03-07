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
    question: "What's the minimum required to get a website up and running?",
    answer:
      "You need a domain name, hosting, an SSL certificate, and a website build. Domain around $10–$40/year, hosting from $39.99/month, SSL included. We can handle all of it.",
  },
  {
    question: "How much does it cost to build a website?",
    answer:
      "Fixed upfront pricing: Professional from $750, Professional Plus from $980, Custom on request. See our Pricing page or book a chat for a recommendation.",
  },
  {
    question: "How long does it take to build a website?",
    answer: "Most websites are live within 5 days, once we have the information we need from you.",
  },
  {
    question: "What happens after the website goes live?",
    answer:
      "We offer ongoing hosting and maintenance from $39.99 per month so everything stays secure and running smoothly.",
  },
  {
    question: "What is a domain name?",
    answer:
      "A domain name is your website address (e.g. yourbusiness.com.au). Customers type it into their browser to find you. You need one before going live.",
  },
  {
    question: "What is hosting?",
    answer:
      "Hosting keeps your website online 24/7. Like rent for your site—it stores your site and makes it visible on the internet. Without it, your website cannot be seen.",
  },
  {
    question: "What is SSL?",
    answer:
      "SSL is a security certificate that makes your site show as secure (https://) and builds trust. We include SSL with our hosting.",
  },
  {
    question: "What is SEO and AEO?",
    answer:
      "SEO helps your site show up on Google when people search. AEO helps you appear in AI answers (e.g. ChatGPT, voice assistants). We structure your site for both.",
  },
  {
    question: "What is a Smart (AI) Assistant?",
    answer:
      "A Smart Assistant answers common questions and captures enquiries 24/7, and sends enquiries to you. It keeps you responsive without extra admin.",
  },
  {
    question: "Do I need to understand any tech?",
    answer: "No. We handle the setup and technical side so you can focus on running your business.",
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
        <main id="main-content" className="pt-16 sm:pt-20" role="main">
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
