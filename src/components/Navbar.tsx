import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/ldb-logo-clean.png";

const Navbar = () => {
  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 bg-hero/95 backdrop-blur-md border-b border-white/5 overflow-visible">
      <div className="container-narrow flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Local Digital Business"
            className="h-28 sm:h-32 w-auto mb-[-8px]"
            style={{ clipPath: "inset(0 0 12% 0)" }}
            priority
          />
        </Link>
        <div className="flex items-center gap-8">
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
      </div>
    </nav>
  );
};

export default Navbar;
