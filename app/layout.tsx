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
  title: "Magizhan Govindharaji",
  description:
    "Magizhan Govindharaji is a Software Engineer specializing in React, Node.js, and scalable web applications and Flutter mobile applications.",
  keywords: [
    "Magizhan Govindharaji",
    "Software Engineer",
    "React Developer",
    "Portfolio",
    "Full Stack Developer",
  ],
  openGraph: {
    title: "Magizhan Govindharaji",
    description: "Full Stack Developer Portfolio",
    url: "https://magizhan.digital",
    siteName: "Magizhan Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://x.com/MagizhanGovind",
    title: "Magizhan Govindharaji",
    description: "Full Stack Developer",
  },
  icons: {
    icon: [{ url: "/micon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-theme="dark"
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
