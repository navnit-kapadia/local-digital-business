"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Quick Chat",
    description: "Tell us about your business and what you need.",
  },
  {
    num: "02",
    title: "We Build It",
    description: "Website and smart assistant — fully set up for you.",
  },
  {
    num: "03",
    title: "Go Live",
    description: "Online in 5 days. Ready for customers.",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Getting Online Shouldn't Be{" "}
            <span className="text-accent">Complicated.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <span className="block font-heading text-5xl font-bold text-accent/40 mb-4">
                {step.num}
              </span>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
