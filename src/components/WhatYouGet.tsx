"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Look Professional",
    description:
      "A clean, credible website that builds trust instantly with every visitor.",
  },
  {
    title: "Get Found",
    description:
      "Built to show up when locals search for your services on Google.",
  },
  {
    title: "Always Available",
    description:
      "Your smart assistant answers questions and captures leads 24/7.",
  },
];

const WhatYouGet = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Built to Help You Grow.{" "}
            <span className="text-accent">Without Extra Admin.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-10 h-px bg-accent mb-6" />
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
