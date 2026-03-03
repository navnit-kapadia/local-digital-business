import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-hero/95 backdrop-blur-md border-b border-white/5">
      <div className="container-narrow flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center">
          <img src={logo} alt="Local Digital Business" className="h-12" />
        </a>
        <div className="flex items-center gap-8">
          <a
            href="/pricing"
            className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide"
          >
            Pricing
          </a>
          <a
            href="/contact"
            className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide"
          >
            Contact
          </a>
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
