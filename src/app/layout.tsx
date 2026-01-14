import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Lora, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const headingSerif = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const bodySerif = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const arabicOptional = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400","500","700"],
});

const siteUrl = "https://mrmelo.com";
const siteName = "Mr.Melo";
const siteDescription = "Media, code, and story shaped with content of character.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Media, Code, and Story`,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} — Media, Code, and Story`,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${siteName} — Media, Code, and Story`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Media, Code, and Story`,
    description: siteDescription,
    images: [`${siteUrl}/opengraph-image`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    email: "info@mrmelo.com",
    sameAs: [siteUrl],
    logo: `${siteUrl}/og.jpg`,
  } as const;

  return (
    <html lang="en" className={`${headingSerif.variable} ${bodySerif.variable} ${arabicOptional.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />

        <Script id="org-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
