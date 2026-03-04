import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Local Digital Business — Websites & AI Assistants for Small Businesses",
  description:
    "Simple websites and smart AI assistants for sole traders and small businesses. Live in 5 days, fixed pricing, no tech stress.",
  authors: [{ name: "Local Digital Business" }],
  openGraph: {
    title: "Local Digital Business — Get Found. Get Booked. 24/7.",
    description:
      "We build simple websites and smart assistants for small businesses — so you never miss an enquiry.",
    type: "website",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Lovable",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
