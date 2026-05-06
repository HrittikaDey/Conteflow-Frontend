import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conteflow — Build. Transform. Distribute.",
  description: "AI-powered content marketing pipeline. One topic generates blog, social, email and SEO simultaneously.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
</head>
      <body>{children}</body>
    </html>
  );
}