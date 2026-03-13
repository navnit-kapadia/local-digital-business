"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

import heroHairdresser from "@/assets/hero-hairdresser.jpg";
import heroRestaurant from "@/assets/hero-restaurant.jpg";
import heroTradie from "@/assets/hero-tradie.jpg";
import heroFoodtruck from "@/assets/hero-foodtruck.jpg";
import heroNdis from "@/assets/hero-ndis.jpg";

const slides = [
  {
    image: heroHairdresser,
    alt: "Hairdresser styling client in modern salon",
    position: "object-[60%_top] sm:object-top",
    flip: false,
  },
  {
    image: heroRestaurant,
    alt: "Chef plating food in restaurant kitchen",
    position: "object-[40%_top] sm:object-top",
    flip: false,
  },
  {
    image: heroTradie,
    alt: "Tradesman working on site",
    position: "object-[50%_top] sm:object-[70%_top]",
    flip: true,
  },
  {
    image: heroFoodtruck,
    alt: "Food truck serving customers at golden hour",
    position: "object-top",
    flip: false,
  },
  {
    image: heroNdis,
    alt: "NDIS support worker helping a client",
    position: "object-[60%_top] sm:object-[30%_top]",
    flip: false,
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-start overflow-hidden">
      {/* First slide rendered statically for LCP — no opacity animation, always present */}
      <div className={`absolute inset-0 ${slides[0].flip ? "-scale-x-100" : ""}`}>
        <Image
          src={slides[0].image}
          alt={slides[0].alt}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${slides[0].position}`}
        />
      </div>

      {/* Animated slideshow overlay — only for slides 1-4 */}
      <AnimatePresence mode="sync">
        {current > 0 && (
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className={`absolute inset-0 ${slides[current].flip ? "-scale-x-100" : ""}`}
          >
            <motion.div
              initial={{ scale: 1.02 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 6, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src={slides[current].image}
                alt={slides[current].alt}
                fill
                sizes="100vw"
                className={`object-cover ${slides[current].position}`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dark overlay - light to preserve natural colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/30 z-10" />

      {/* Content */}
      <div className="relative z-20 container-narrow w-full pt-20 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8"
          >
            <Zap className="w-4 h-4 text-accent fill-accent" />
            <span className="text-sm text-white/80 font-medium tracking-wide">
              For solopreneurs and small businesses
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight leading-[1.08] mb-6 text-white"
          >
            Get Found. Get Booked. <span className="text-accent">24/7.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-lg sm:text-xl text-white/90 max-w-xl mb-8 leading-relaxed drop-shadow-md"
          >
            We build simple websites and smart assistants, so you never miss an
            enquiry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <a
              href="https://calendly.com/sshah-localdigitalbusiness/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-accent/90 transition-colors"
            >
              Book a Free Chat
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl"
        >
          {[
            { stat: "Live in 5 Days", desc: "From brief to launch. No delays, no drag" },
            { stat: "Fixed Pricing", desc: "Know your cost upfront. No hourly surprises" },
            { stat: "No Tech Stress", desc: "We handle everything so you can focus on work" },
          ].map((item, i) => (
            <div key={i} className="border-l-2 border-accent/60 pl-4 bg-black/30 backdrop-blur-sm py-2.5 pr-3">
              <span className="inline-block bg-accent/25 text-white font-bold text-sm px-2.5 py-1 mb-1.5">
                {item.stat}
              </span>
              <p className="text-white/90 text-sm leading-snug">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? "w-10 bg-white" : "w-5 bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
};

export default Hero;
