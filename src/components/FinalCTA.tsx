import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="section-padding bg-primary">
      <div className="container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4 tracking-tight">
            Ready to Get Online and{" "}
            <span className="whitespace-nowrap">Start Taking</span>{" "}
            <span className="text-accent">More Bookings?</span>
          </h2>
          <p className="text-lg text-primary-foreground/60 mb-10">
            Let's get you live in 5 days.
          </p>
          <a
            href="https://calendly.com/sshah-localdigitalbusiness/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-accent/90 transition-colors"
          >
            Book a Free Chat
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <p className="mt-8 text-sm text-primary-foreground/40 tracking-wide">
            Affordable · Straightforward · Sorted
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
