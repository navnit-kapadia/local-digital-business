import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  interest: z.string().trim().min(1, "Please select an option"),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);

    const to = "sshah@localdigitalbusiness.com.au";
    const subject = `Contact: ${form.interest} – ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Interested in: ${form.interest}`,
      "",
      form.message,
    ].join("\n");

    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    toast({
      title: "Opening your email",
      description: "Your email client will open — just hit send to reach us.",
    });
    setForm({ name: "", email: "", phone: "", interest: "", message: "" });
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <section className="section-padding bg-background">
          <div className="container-narrow px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have a question or ready to get started? Drop us a message and
                we'll be in touch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 max-w-4xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-8">
                {[
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Melbourne, Australia",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        {label}
                      </p>
                      <p className="text-foreground font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-card p-8 space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground block mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground block mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-foreground block mb-1.5"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="0400 000 000"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="interest"
                    className="text-sm font-medium text-foreground block mb-1.5"
                  >
                    Interested in
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="Website">Website</option>
                    <option value="Smart Assistant">Smart Assistant</option>
                    <option value="Website + Smart Assistant">
                      Website + Smart Assistant
                    </option>
                  </select>
                  {errors.interest && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.interest}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground block mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 w-full"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
