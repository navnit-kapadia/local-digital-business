import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-hero text-hero-muted py-12 px-4">
      <div className="container-narrow">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <a
            href="/"
            className="flex items-center gap-2 text-hero-foreground font-heading font-bold text-sm tracking-tight"
          >
            <Zap className="w-3.5 h-3.5 text-accent" />
            Local Digital Business
          </a>
          <div className="flex items-center gap-6 text-[13px]">
            <a
              href="/pricing"
              className="text-hero-muted hover:text-hero-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="/contact"
              className="text-hero-muted hover:text-hero-foreground transition-colors"
            >
              Contact
            </a>
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
