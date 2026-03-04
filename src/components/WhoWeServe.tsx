import { motion } from "framer-motion";
import whoWeServeBg from "@/assets/who-we-serve-bg.jpg";

const WhoWeServe = () => {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={whoWeServeBg.src} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-4">
            Who we serve
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Built for Local Businesses{" "}
            <span className="text-accent">Like Yours.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Sole traders and small teams who want more customers without more
            stress.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeServe;
