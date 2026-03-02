import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Comparison from "@/components/Comparison";
import HowItWorks from "@/components/HowItWorks";
import WhatYouGet from "@/components/WhatYouGet";
import WhoWeServe from "@/components/WhoWeServe";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <Comparison />
        <HowItWorks />
        <WhatYouGet />
        <WhoWeServe />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
