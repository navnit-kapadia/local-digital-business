import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAILS = [
  "sshah@localdigitalbusiness.com.au",
  "navnitkapadia@gmail.com",
];

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  console.log("[contact] GMAIL_USER:", user ?? "MISSING");
  console.log("[contact] GMAIL_APP_PASSWORD:", pass ? `set (${pass.length} chars)` : "MISSING");
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error("[contact] RECAPTCHA_SECRET_KEY is not configured");
    return false;
  }

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: secretKey, response: token }),
  });

  const data = (await res.json()) as { success: boolean; score?: number; "error-codes"?: string[] };
  console.log("[contact] reCAPTCHA verify result:", data);
  return data.success === true;
}

export async function POST(request: Request) {
  console.log("[contact] POST received");

  let body: {
    name?: string;
    email?: string;
    phone?: string;
    interest?: string;
    message?: string;
    recaptchaToken?: string;
  };

  try {
    body = await request.json();
    console.log("[contact] Body parsed:", { name: body.name, email: body.email, phone: body.phone, interest: body.interest, messageLength: body.message?.length, hasRecaptcha: !!body.recaptchaToken });
  } catch (err) {
    console.error("[contact] Failed to parse JSON body:", err);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // reCAPTCHA server-side verification
  if (!body.recaptchaToken) {
    console.warn("[contact] Missing reCAPTCHA token");
    return NextResponse.json({ error: "Please complete the reCAPTCHA verification" }, { status: 400 });
  }

  const recaptchaValid = await verifyRecaptcha(body.recaptchaToken);
  if (!recaptchaValid) {
    console.warn("[contact] reCAPTCHA verification failed");
    return NextResponse.json({ error: "reCAPTCHA verification failed. Please try again." }, { status: 400 });
  }
  console.log("[contact] reCAPTCHA verified");

  const transporter = createTransporter();
  if (!transporter) {
    console.error("[contact] Transporter creation failed — missing env vars");
    return NextResponse.json(
      { error: "Email not configured (missing GMAIL_USER or GMAIL_APP_PASSWORD)" },
      { status: 500 },
    );
  }
  console.log("[contact] Transporter created");

  const { name, email, phone, interest, message } = body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    console.warn("[contact] Missing required fields:", { name: !!name, email: !!email, message: !!message });
    return NextResponse.json(
      { error: "Missing required fields: name, email, message" },
      { status: 400 },
    );
  }

  const fromName = process.env.GMAIL_FROM_NAME || "Local Digital Business";
  const fromEmail = process.env.GMAIL_USER!;
  const subject = `Contact: ${interest || "Enquiry"} – ${name}`;
  console.log("[contact] Sending email — from:", `${fromName} <${fromEmail}>`, "to:", TO_EMAILS, "subject:", subject);

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Interested in: ${interest || "—"}`,
    "",
    message,
  ].join("\n");
  const html = [
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    `<p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>`,
    `<p><strong>Interested in:</strong> ${escapeHtml(interest || "—")}</p>`,
    `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
  ].join("");

  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: TO_EMAILS,
      replyTo: email,
      subject,
      text,
      html,
    });
    console.log("[contact] Email sent — messageId:", info.messageId, "response:", info.response);
  } catch (err) {
    console.error("[contact] SMTP sendMail error:", err);
    const msg = err instanceof Error ? err.message : "Failed to send email";
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
