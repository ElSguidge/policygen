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
  title: "Free Legal Document Generator | Privacy Policy, Terms, EULA | PolicyGen",
  description: "Generate free, professional legal documents for your website or app. Privacy Policy, Terms of Service, Cookie Policy, EULA, Refund Policy, Disclaimers. GDPR, CCPA, CalOPPA compliant. No signup required.",
  keywords: ["privacy policy generator", "terms of service generator", "cookie policy generator", "EULA generator", "refund policy", "disclaimer generator", "GDPR compliant", "CCPA compliant", "CalOPPA", "free legal documents"],
  openGraph: {
    title: "Free Legal Document Generator | PolicyGen",
    description: "Create professional legal documents for your website in minutes. Privacy Policy, Terms of Service, EULA & more. 100% free.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Legal Document Generator | PolicyGen",
    description: "Create professional legal documents for your website in minutes. Privacy Policy, Terms of Service, EULA & more. 100% free.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
