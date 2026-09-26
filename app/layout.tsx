import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vaibhav — Rust, C++ & Software Engineering",
  description:
    "Vaibhav's portfolio — Rust and C++ focused software development, with MERN for full-stack products.",
  keywords: [
    "Vaibhav",
    "Rust",
    "C++",
    "MERN",
    "software developer",
    "backend developer",
    "portfolio",
  ],
  authors: [{ name: "Vaibhav" }],
  creator: "Vaibhav",
  openGraph: {
    title: "Vaibhav — Rust, C++ & Software Engineering",
    description:
      "Rust and C++ focused software development. MERN for full-stack products.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav — Rust, C++ & Software Engineering",
    description:
      "Rust and C++ focused software development. MERN for full-stack products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
