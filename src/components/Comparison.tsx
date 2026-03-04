import { X, Check, ThumbsDown, Sparkles } from "lucide-react";

const oldWay = [
  "Expensive agency quotes",
  "Weeks of back and forth",
  "You chase content and updates",
  "A website that just sits there",
];

const betterWay = [
  "Affordable fixed pricing",
  "Live in 5 days",
  "We take care of the setup",
  "Smart assistant working 24/7",
];

const Comparison = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Your time is money.
            <br />
            <span className="text-accent">We help you keep both.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* The Old Way */}
          <div className="relative bg-card border border-border rounded-sm p-10 md:p-12">
            <div className="absolute top-0 left-0 right-0 h-1 bg-destructive/60 rounded-t-sm" />
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-destructive mb-10">
              <ThumbsDown className="w-4 h-4" />
              The Old Way
            </h3>
            <div className="space-y-6">
              {oldWay.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-destructive" />
                  </div>
                  <span className="text-[15px] text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* The Better Way */}
          <div className="relative bg-primary border border-primary rounded-sm p-10 md:p-12 shadow-lg shadow-primary/20">
            <div className="absolute top-0 left-0 right-0 h-1 bg-accent rounded-t-sm" />
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-accent mb-10">
              <Sparkles className="w-4 h-4" />
              The Better Way
            </h3>
            <div className="space-y-6">
              {betterWay.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <span className="text-[15px] text-primary-foreground font-medium leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
