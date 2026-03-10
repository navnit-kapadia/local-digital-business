"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Send } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  interest: z.string().trim().min(1, "Please select an option"),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { question: `What is ${a} + ${b}?`, answer: a + b };
}

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
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");

  const refreshCaptcha = useCallback(() => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  }, []);

  useEffect(() => {
    refreshCaptcha();
  }, [refreshCaptcha]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    const fieldErrors: Record<string, string> = {};
    if (!result.success) {
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
    }
    if (parseInt(captchaInput, 10) !== captcha.answer) {
      fieldErrors.captcha = "Incorrect answer, please try again";
      refreshCaptcha();
    }
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          interest: form.interest,
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you shortly.",
        });
        setForm({ name: "", email: "", phone: "", interest: "", message: "" });
        refreshCaptcha();
      } else {
        toast({
          title: "Something went wrong",
          description:
            data.error ||
            "Please try again or email sshah@localdigitalbusiness.com.au",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Something went wrong",
        description:
          "Please try again or email sshah@localdigitalbusiness.com.au",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
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
                Have a question or ready to get started?
                <br />
                Drop us a message and we&apos;ll be in touch.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
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
                    <option value="Something Else">Something Else</option>
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
                <div>
                  <label
                    htmlFor="captcha"
                    className="text-sm font-medium text-foreground block mb-1.5"
                  >
                    {captcha.question}
                  </label>
                  <input
                    id="captcha"
                    name="captcha"
                    type="number"
                    value={captchaInput}
                    onChange={(e) => {
                      setCaptchaInput(e.target.value);
                      setErrors({ ...errors, captcha: "" });
                    }}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Your answer"
                  />
                  {errors.captcha && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.captcha}
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

              <div className="flex items-center justify-center gap-2 mt-8 text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Melbourne, Australia</span>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
