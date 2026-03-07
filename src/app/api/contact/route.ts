import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAILS = ["sshah@localdigitalbusiness.com.au", "navnitkapadia@gmail.com"];

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
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });
}

export async function POST(request: Request) {
  const transporter = createTransporter();
  if (!transporter) {
    return NextResponse.json(
      { error: "Email not configured (missing GMAIL_USER or GMAIL_APP_PASSWORD)" },
      { status: 500 }
    );
  }

  let body: {
    name?: string;
    email?: string;
    phone?: string;
    interest?: string;
    message?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { name, email, phone, interest, message } = body || {};
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, message" },
      { status: 400 }
    );
  }

  const fromName = process.env.GMAIL_FROM_NAME || "Local Digital Business";
  const fromEmail = process.env.GMAIL_USER!;
  const subject = `Contact: ${interest || "Enquiry"} – ${name}`;
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
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: TO_EMAILS,
      replyTo: email,
      subject,
      text,
      html,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to send email";
    console.error("SMTP error:", err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
