"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Sparkles, Star, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const plans = [
  {
    name: "Professional",
    price: "$899",
    introPrice: "$750",
    description:
      "A clean, professional one-page website built to get you online quickly and looking credible.",
    includes: [
      "Custom one-page website",
      "Contact section",
      "Booking form",
      "Mobile-friendly design",
      { text: "SEO & AEO setup", tooltip: "seo" } as { text: string; tooltip?: string },
      "Live in 5 days",
    ],
    bestFor: "Solopreneurs who need a simple, professional online presence.",
    popular: false,
  },
  {
    name: "Professional Plus",
    price: "$1,150",
    introPrice: "$980",
    description:
      "More space to showcase your services and build trust with customers.",
    includesPrefix: "Includes everything in Professional, plus:",
    includes: [
      "Two additional pages",
      "More space to explain services",
      "Stronger search visibility",
      "More credibility for growing businesses",
    ],
    bestFor: "Businesses with different services or more content.",
    popular: true,
  },
  {
    name: "Custom",
    price: "Let's Talk",
    description:
      "For businesses with unique needs or bigger ambitions. We'll tailor a solution that fits.",
    includes: [
      "Custom design and branding",
      "Additional pages as needed",
      "Ongoing support options",
      "Tailored integrations",
    ],
    bestFor:
      "Businesses that need something beyond a standard package.",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <section className="section-padding bg-background">
          <div className="container-narrow px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                No hidden fees. Just a great website at a fair price.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border p-8 flex flex-col ${
                    plan.popular
                      ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                      : "border-border bg-card"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-4 py-1 text-xs font-bold uppercase tracking-wider">
                        <Star className="w-3 h-3" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    {plan.name}
                  </h2>
                  <div className="mt-4 mb-4 min-h-[100px]">
                    {plan.introPrice ? (
                      <div className="flex flex-col">
                        <span className="text-base text-muted-foreground line-through decoration-destructive/60">
                          {plan.price}
                        </span>
                        <span className="font-heading text-5xl font-bold text-foreground">
                          {plan.introPrice}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-accent mt-1">
                          Introductory Price
                        </span>
                      </div>
                    ) : (
                      <span
                        className={`font-heading font-bold text-foreground ${plan.price === "Let's Talk" ? "text-3xl text-accent" : "text-5xl"}`}
                      >
                        {plan.price}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 min-h-[80px]">
                    {plan.description}
                  </p>

                  {plan.includesPrefix && (
                    <p className="text-sm font-medium text-foreground mb-3">
                      {plan.includesPrefix}
                    </p>
                  )}
                  {!plan.includesPrefix && (
                    <p className="text-sm font-medium text-foreground mb-3">
                      Includes:
                    </p>
                  )}

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.includes.map((item) => {
                      const isObject =
                        typeof item === "object" && item !== null && "text" in item;
                      const text = isObject ? (item as { text: string }).text : (item as string);
                      const tooltip = isObject
                        ? (item as { tooltip?: string }).tooltip
                        : null;
                      return (
                        <li key={text} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-success" />
                          </div>
                          <span className="text-sm text-foreground inline-flex items-center gap-1.5">
                            {text}
                            {tooltip === "seo" && (
                              <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help shrink-0" />
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="top"
                                    className="max-w-[260px] text-xs leading-relaxed"
                                  >
                                    <p className="mb-1">
                                      <strong>SEO</strong> helps your website
                                      show up on Google when people search for
                                      your services.
                                    </p>
                                    <p>
                                      <strong>AEO</strong> helps your website
                                      appear in AI-generated answers from tools
                                      like ChatGPT and voice assistants.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="bg-muted/50 rounded-lg p-4 mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Best for
                    </p>
                    <p className="text-sm text-foreground">{plan.bestFor}</p>
                  </div>

                  <a
                    href="https://calendly.com/sshah-localdigitalbusiness/15min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                      plan.popular
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : "bg-foreground text-background hover:bg-foreground/90"
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              ))}
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="rounded-2xl border border-border bg-card p-8 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Optional Add-On
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-1">
                    Smart Assistant: from{" "}
                    <span className="text-accent">$599</span>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    For businesses that don&apos;t want to miss opportunities
                    while busy or after hours.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Answers common questions",
                      "Captures customer details",
                      "Works 24/7",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-sm text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="https://calendly.com/sshah-localdigitalbusiness/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:bg-accent/90 transition-colors shrink-0"
                >
                  Enquire Now
                </a>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Pricing;
