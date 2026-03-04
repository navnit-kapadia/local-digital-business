import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "sshah@localdigitalbusiness.com.au";
const FROM_EMAIL =
  process.env.RESEND_FROM ||
  "Local Digital Business <onboarding@resend.dev>";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    res
      .status(500)
      .json({ error: "Email not configured (missing RESEND_API_KEY)" });
    return;
  }

  const body = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    interest?: string;
    message?: string;
  };

  const { name, email, phone, interest, message } = body || {};
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res
      .status(400)
      .json({ error: "Missing required fields: name, email, message" });
    return;
  }

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

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: email,
    subject,
    text,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to send email" });
    return;
  }

  res.status(200).json({ success: true, id: data?.id });
}
