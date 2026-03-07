import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const fromName = process.env.GMAIL_FROM_NAME || "Local Digital Business";
  const toEmails = [
    process.env.CONTACT_FROM_EMAIL || "sshah@localdigitalbusiness.com.au",
    user,
  ];

  if (!user || !pass) {
    return NextResponse.json(
      { error: "Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment" },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });

  try {
    await transporter.verify();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "SMTP connection failed", detail: msg },
      { status: 500 }
    );
  }

  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to: toEmails,
      subject: "Test Email – Gmail SMTP",
      text: "This is a test email sent via Gmail SMTP from Local Digital Business.",
      html: "<p>This is a <strong>test email</strong> sent via Gmail SMTP from Local Digital Business.</p>",
    });

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      sentTo: toEmails,
      sentFrom: `${fromName} <${user}>`,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Test email error:", err);
    return NextResponse.json(
      { error: "Failed to send test email", detail: msg },
      { status: 500 }
    );
  }
}
