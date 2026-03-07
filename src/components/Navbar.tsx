"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import logo from "@/assets/ldb-logo-clean.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-hero/95 backdrop-blur-md border-b border-white/5"
    >
      {/* Main bar */}
      <div className="container-narrow flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Image
            src={logo}
            alt="Local Digital Business"
            className="h-14 sm:h-28 w-auto sm:mb-[-8px]"
            style={{ clipPath: "inset(0 0 12% 0)" }}
            sizes="(max-width: 640px) 3.5rem, 8rem"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8">
          <Link
            href="/pricing"
            className="text-[13px] font-semibold text-white/80 hover:text-white transition-colors tracking-wide"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="text-[13px] font-semibold text-white/80 hover:text-white transition-colors tracking-wide"
          >
            Contact
          </Link>
          <a
            href="https://calendly.com/sshah-localdigitalbusiness/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-accent text-accent-foreground px-5 py-2 text-[13px] font-semibold hover:bg-accent/90 transition-colors tracking-wide"
          >
            Book a Chat
          </a>
        </div>

        {/* Mobile: CTA + hamburger */}
        <div className="flex sm:hidden items-center gap-3">
          <a
            href="https://calendly.com/sshah-localdigitalbusiness/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-accent text-accent-foreground px-4 py-2 text-[12px] font-semibold hover:bg-accent/90 transition-colors tracking-wide whitespace-nowrap"
          >
            Book a Chat
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="p-1.5 text-white/80 hover:text-white transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden bg-hero/98 border-t border-white/5 px-4 py-2">
          <Link
            href="/pricing"
            onClick={() => setOpen(false)}
            className="flex items-center py-3.5 text-[14px] font-semibold text-white/80 hover:text-white transition-colors tracking-wide border-b border-white/10"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center py-3.5 text-[14px] font-semibold text-white/80 hover:text-white transition-colors tracking-wide"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
