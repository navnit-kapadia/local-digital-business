import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/ldb-logo-clean.png";

const Footer = () => {
  return (
    <footer className="bg-hero text-hero-muted py-12 px-4">
      <div className="container-narrow">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Local Digital Business"
              className="h-28 sm:h-32 w-auto mb-[-8px]"
              style={{ clipPath: "inset(0 0 12% 0)" }}
              sizes="(max-width: 640px) 7rem, 8rem"
            />
          </Link>
          <div className="flex items-center gap-6 text-[13px]">
            <Link
              href="/pricing"
              className="text-hero-muted hover:text-hero-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-hero-muted hover:text-hero-foreground transition-colors"
            >
              Contact
            </Link>
          </div>
          <p className="text-[13px] text-hero-muted/60">
            © {new Date().getFullYear()} Local Digital Business
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
