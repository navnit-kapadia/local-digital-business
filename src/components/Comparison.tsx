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
            Your time is money.{" "}
            <span className="text-accent">We help you keep both.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px max-w-4xl mx-auto bg-border rounded-sm overflow-hidden">
          {/* The Old Way */}
          <div className="bg-card p-10">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60 mb-8">
              The Old Way
            </h3>
            <div className="space-y-5">
              {oldWay.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-destructive text-sm">✕</span>
                  <span className="text-[15px] text-muted-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* The Better Way */}
          <div className="bg-primary/5 p-10">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground mb-8">
              The Better Way
            </h3>
            <div className="space-y-5">
              {betterWay.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-success text-sm">✓</span>
                  <span className="text-[15px] text-foreground font-medium">
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
