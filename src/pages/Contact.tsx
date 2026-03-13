"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MapPin,
  Mail,
  Clock,
  ArrowRight,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone number is too long"),
  interest: z.string().trim().min(1, "Please select an option"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

type FormField = keyof z.infer<typeof contactSchema>;
const FIELDS: FormField[] = ["name", "email", "phone", "interest", "message"];

/* ── helpers ── */
function parseErrors(data: Record<FormField, string>): Record<string, string> {
  const result = contactSchema.safeParse(data);
  const errs: Record<string, string> = {};
  if (!result.success) {
    result.error.errors.forEach((e) => {
      if (e.path[0]) errs[e.path[0] as string] = e.message;
    });
  }
  return errs;
}

const base =
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors";
const stateClass = (
  field: FormField,
  touched: Record<string, boolean>,
  errors: Record<string, string>,
  value: string,
) => {
  if (!touched[field]) return "h-10 border-input focus-visible:ring-ring";
  if (errors[field]) return "h-10 border-destructive focus-visible:ring-destructive";
  if (value.trim()) return "h-10 border-green-500 focus-visible:ring-green-500";
  return "h-10 border-input focus-visible:ring-ring";
};

/* ── component ── */
const Contact = () => {
  const [form, setForm] = useState<Record<FormField, string>>({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const isFormValid = contactSchema.safeParse(form).success && !!recaptchaToken;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value } as Record<FormField, string>;
    setForm(updated);
    if (touched[name]) {
      const errs = parseErrors(updated);
      setErrors((prev) => ({ ...prev, [name]: errs[name] ?? "" }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = parseErrors(form);
    setErrors((prev) => ({ ...prev, [name]: errs[name] ?? "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");

    // Touch all fields to reveal any hidden errors
    setTouched(Object.fromEntries(FIELDS.map((f) => [f, true])));
    const fieldErrors = parseErrors(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    if (!recaptchaToken) {
      setServerError("Please complete the reCAPTCHA verification.");
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
          recaptchaToken,
        }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };

      if (data.success) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", interest: "", message: "" });
        setTouched({});
        setErrors({});
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  };

  /* Success screen */
  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="bg-primary pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Contact Us</p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground tracking-tight">
              Let&apos;s Get You Online
            </h1>
          </div>
        </section>
        <section className="bg-background px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-lg mx-auto text-center">
            <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-6" />
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">Message sent!</h2>
            <p className="text-muted-foreground mb-8">
              Thanks for reaching out. We&apos;ll get back to you within one business day.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:bg-accent/90 transition-colors"
            >
              Send another message
            </button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Page header */}
      <section className="bg-primary pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Contact Us
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground tracking-tight leading-tight">
            Let&apos;s Get You Online
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/60 max-w-xl">
            Have a question or ready to get started? Drop us a message and
            we&apos;ll be back in touch within one business day.
          </p>
        </div>
      </section>

      {/* Main — two columns */}
      <section className="bg-background px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left — info */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-5 tracking-tight">
                What happens next?
              </h2>
              <ol className="space-y-5">
                {[
                  { step: "01", title: "Send your message", desc: "Fill in the form — takes less than a minute." },
                  { step: "02", title: "We'll be in touch", desc: "Expect a reply within one business day." },
                  { step: "03", title: "Free 15-min chat", desc: "We'll talk through your needs and recommend the right fit." },
                ].map(({ step, title, desc }) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/15 text-accent font-bold text-sm flex items-center justify-center">
                      {step}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{title}</p>
                      <p className="text-muted-foreground text-sm mt-0.5">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-border" />

            <div className="space-y-4">
              <h2 className="font-heading text-base font-bold text-foreground tracking-tight">
                Contact details
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                  <a href="mailto:hello@localdigitalbusiness.com.au" className="hover:text-foreground transition-colors">
                    hello@localdigitalbusiness.com.au
                  </a>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                  <span>Melbourne, Australia</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <Clock className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                  <span>Mon – Fri, 9 am – 5 pm AEST</span>
                </li>
              </ul>
            </div>

            <a
              href="https://calendly.com/sshah-localdigitalbusiness/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold tracking-wide hover:bg-primary/90 transition-colors"
            >
              Book a free 15-min chat
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-foreground mb-6 tracking-tight">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground block mb-1.5">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="name" name="name" autoComplete="name"
                    value={form.name} onChange={handleChange} onBlur={handleBlur}
                    placeholder="Your name"
                    className={`${base} ${stateClass("name", touched, errors, form.name)}`}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && touched.name && (
                    <p className="flex items-center gap-1 text-sm text-destructive mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden />{errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground block mb-1.5">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="email" name="email" type="email" autoComplete="email"
                    value={form.email} onChange={handleChange} onBlur={handleBlur}
                    placeholder="you@example.com"
                    className={`${base} ${stateClass("email", touched, errors, form.email)}`}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && touched.email && (
                    <p className="flex items-center gap-1 text-sm text-destructive mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden />{errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-foreground block mb-1.5">
                    Phone <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="phone" name="phone" type="tel" autoComplete="tel"
                    value={form.phone} onChange={handleChange} onBlur={handleBlur}
                    placeholder="0400 000 000"
                    className={`${base} ${stateClass("phone", touched, errors, form.phone)}`}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && touched.phone && (
                    <p className="flex items-center gap-1 text-sm text-destructive mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden />{errors.phone}
                    </p>
                  )}
                </div>

                {/* Interest */}
                <div>
                  <label htmlFor="interest" className="text-sm font-medium text-foreground block mb-1.5">
                    Interested in <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="interest" name="interest"
                    value={form.interest} onChange={handleChange} onBlur={handleBlur}
                    className={`${base} ${stateClass("interest", touched, errors, form.interest)}`}
                    aria-invalid={!!errors.interest}
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Website">Website</option>
                    <option value="Smart Assistant">Smart Assistant</option>
                    <option value="Website + Smart Assistant">Website + Smart Assistant</option>
                    <option value="Something Else">Something Else</option>
                  </select>
                  {errors.interest && touched.interest && (
                    <p className="flex items-center gap-1 text-sm text-destructive mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden />{errors.interest}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <span className={`text-xs tabular-nums ${form.message.length > 950 ? "text-destructive" : "text-muted-foreground"}`}>
                      {form.message.length}/1000
                    </span>
                  </div>
                  <textarea
                    id="message" name="message"
                    value={form.message} onChange={handleChange} onBlur={handleBlur}
                    rows={4} maxLength={1000}
                    placeholder="Tell us about your project..."
                    className={`${base.replace("flex", "flex min-h-[100px]")} ${
                      !touched.message ? "border-input focus-visible:ring-ring" :
                      errors.message ? "border-destructive focus-visible:ring-destructive" :
                      form.message.trim() ? "border-green-500 focus-visible:ring-green-500" :
                      "border-input focus-visible:ring-ring"
                    } resize-none`}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && touched.message && (
                    <p className="flex items-center gap-1 text-sm text-destructive mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden />{errors.message}
                    </p>
                  )}
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
                    onChange={(token) => setRecaptchaToken(token)}
                    onExpired={() => setRecaptchaToken(null)}
                  />
                </div>

                {/* Server error */}
                {serverError && (
                  <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
                    {serverError}
                  </div>
                )}

                {/* Submit */}
                <div className="space-y-2 pt-1">
                  <button
                    type="submit"
                    disabled={!isFormValid || submitting}
                    aria-busy={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
                  >
                    {submitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" aria-hidden />Sending…</>
                    ) : (
                      <><Send className="w-4 h-4" aria-hidden />Send Message</>
                    )}
                  </button>

                  {!isFormValid && (
                    <p className="text-center text-xs text-muted-foreground">
                      {recaptchaToken ? "Please fill in all required fields to send your message." : "Please complete the reCAPTCHA and fill in all required fields."}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
