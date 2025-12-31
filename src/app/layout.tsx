import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://safedocgen.app"),
  title: {
    default: "Free Legal Document Generator | Privacy Policy, Terms, SWMS | SafeDocGen",
    template: "%s | SafeDocGen",
  },
  description: "Generate free, professional legal documents for your website or app. Privacy Policy, Terms of Service, Cookie Policy, EULA, Refund Policy, Disclaimers, SWMS. GDPR, CCPA, CalOPPA compliant. Australian WHS compliant SWMS generator.",
  keywords: ["privacy policy generator", "terms of service generator", "cookie policy generator", "EULA generator", "refund policy", "disclaimer generator", "SWMS generator", "safe work method statement", "SWMS template", "Australian SWMS", "WHS compliance", "high risk construction work", "GDPR compliant", "CCPA compliant", "CalOPPA", "free legal documents"],
  authors: [{ name: "SafeDocGen" }],
  creator: "SafeDocGen",
  publisher: "SafeDocGen",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "xcw1AVbcXtvcVgBbkX1N41ojphCspx_BVa2axLVGy8I",
  },
  openGraph: {
    title: "Free Legal Document Generator | SWMS, Privacy Policy, Terms | SafeDocGen",
    description: "Create professional legal documents and SWMS in minutes. Privacy Policy, Terms of Service, EULA, Safe Work Method Statements & more. 100% free.",
    url: "https://safedocgen.app",
    siteName: "SafeDocGen",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SafeDocGen - Free Legal Document Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Legal Document Generator | SWMS, Privacy Policy, Terms | SafeDocGen",
    description: "Create professional legal documents and SWMS in minutes. Privacy Policy, Terms of Service, EULA, Safe Work Method Statements & more. 100% free.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Organization JSON-LD schema for SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SafeDocGen",
  url: "https://safedocgen.app",
  logo: "https://safedocgen.app/logo.png",
  description:
    "Free legal document generator for websites and apps. Create Privacy Policies, Terms of Service, Cookie Policies, EULAs, Safe Work Method Statements (SWMS), and more.",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://safedocgen.app",
  },
};

// WebSite schema for sitelinks search box
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SafeDocGen",
  url: "https://safedocgen.app",
  description:
    "Generate free, professional legal documents for your website or app.",
  publisher: {
    "@type": "Organization",
    name: "SafeDocGen",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
