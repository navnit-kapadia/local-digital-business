"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What's the minimum required to get a website up and running?",
    answer: (
      <>
        <p className="mb-3">
          To get a website live, you need a domain name, hosting, an SSL certificate (security), and a website build.
        </p>
        <p className="mb-2 font-medium text-foreground">Typical costs are:</p>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>Domain name: around $10–$40 per year (.com.au), charged by the domain provider</li>
          <li>Hosting: from $39.99 per month</li>
          <li>SSL: included with hosting</li>
          <li>
            Website build: a one-off fixed cost depending on the package you choose. You can view the available website packages and pricing on our{" "}
            <a href="/pricing" className="text-accent underline hover:text-accent/80">Pricing page</a>.
          </li>
        </ul>
        <p>We can handle all of this for you, so you don&apos;t have to deal with the technical setup.</p>
      </>
    ),
  },
  {
    question: "How much does it cost to build a website?",
    answer: (
      <>
        <p className="mb-3">We offer fixed, upfront pricing. No surprises.</p>
        <div className="space-y-3 mb-3">
          <div>
            <p className="font-medium text-foreground">Tier 1: Professional</p>
            <p className="text-accent font-semibold">$750 Introductory Price <span className="text-muted-foreground font-normal line-through">($899)</span></p>
            <p>A clean, professional one-page website designed to get you online quickly and looking credible.</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Tier 2: Professional Plus</p>
            <p className="text-accent font-semibold">$980 Introductory Price <span className="text-muted-foreground font-normal line-through">($1,150)</span></p>
            <p>More space to showcase your services and build trust with customers. Ideal for businesses that need additional pages or want to provide more information about their services.</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Tier 3: Custom Website</p>
            <p>Ideal for businesses that need a larger website or have more specific requirements.</p>
          </div>
        </div>
        <p className="mb-2">
          <a href="https://calendly.com/sshah-localdigitalbusiness/15min" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/80">Book a quick chat</a> and we&apos;ll recommend the best setup for your business.
        </p>
        <p>
          You can view full details and compare options on our{" "}
          <a href="/pricing" className="text-accent underline hover:text-accent/80">Pricing page</a>.
        </p>
      </>
    ),
  },
  {
    question: "How long does it take to build a website?",
    answer: "Most websites are live within 5 days, once we have the information we need from you.",
  },
  {
    question: "What happens after the website goes live?",
    answer: "We offer ongoing hosting and maintenance from $39.99 per month, so everything stays secure and running smoothly without you having to worry about updates or technical issues.",
  },
  {
    question: "What is a domain name?",
    answer: (
      <>
        <p className="mb-2">A domain name is your website address (for example, yourbusiness.com.au).</p>
        <p className="mb-2">It&apos;s what customers type into their browser to find your website.</p>
        <p>You&apos;ll need a domain name before your website can go live.</p>
      </>
    ),
  },
  {
    question: "What is hosting?",
    answer: (
      <>
        <p className="mb-2">Hosting is what keeps your website online and accessible.</p>
        <p className="mb-2">Think of it like rent for your website. It stores your website and makes it available on the internet 24/7.</p>
        <p>Without hosting, your website cannot be seen.</p>
      </>
    ),
  },
  {
    question: "What is SSL?",
    answer: (
      <>
        <p className="mb-2">SSL is a security certificate that protects your website.</p>
        <p className="mb-2">It ensures your site appears as secure (https://) and helps build trust with visitors.</p>
        <p className="mb-2">Without SSL, browsers may show a warning message.</p>
        <p>We include SSL with our hosting.</p>
      </>
    ),
  },
  {
    question: "What is SEO and AEO?",
    answer: (
      <>
        <p className="mb-3">
          <span className="font-medium text-foreground">SEO (Search Engine Optimisation)</span> helps your website show up on Google when people search for your services.
        </p>
        <p className="mb-2">It helps search engines understand:</p>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>What you do</li>
          <li>Where you operate</li>
          <li>Who you serve</li>
        </ul>
        <p className="mb-3">
          <span className="font-medium text-foreground">AEO (Answer Engine Optimisation)</span> helps your website appear when people ask questions in AI tools like ChatGPT, Google&apos;s AI results, or voice assistants.
        </p>
        <p className="mb-2">For example, someone might ask:</p>
        <ul className="list-disc pl-5 space-y-1 mb-3 italic">
          <li>&quot;Best plumber near me&quot;</li>
          <li>&quot;Hair salon open today&quot;</li>
          <li>&quot;Electrician in Parramatta&quot;</li>
        </ul>
        <p className="mb-3">AI tools scan the internet to find clear, well-structured answers. AEO helps position your website so it can be included in those answers.</p>
        <p className="mb-2 font-medium text-foreground">In simple terms:</p>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>SEO helps you get found.</li>
          <li>AEO helps you appear in AI-generated answers.</li>
        </ul>
        <p>We structure your website to support both.</p>
      </>
    ),
  },
  {
    question: "What is a Smart (AI) Assistant?",
    answer: (
      <>
        <p className="mb-2">A Smart Assistant answers common questions and captures enquiries automatically.</p>
        <p className="mb-3">It works 24/7 — even when you&apos;re busy, on-site, or closed.</p>
        <p className="mb-2">It can:</p>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>Answer common questions</li>
          <li>Capture customer details</li>
          <li>Send enquiries directly to you</li>
        </ul>
        <p>This helps you stay responsive without adding extra admin.</p>
      </>
    ),
  },
  {
    question: "Do I need to understand any tech?",
    answer: "No. We handle the setup and technical side so you can focus on running your business.",
  },
];

const FAQ = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-border px-0"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 text-[15px]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-[15px] leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
