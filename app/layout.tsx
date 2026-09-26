import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({
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
  title: "Vaibhav — Rust & C++ Developer",
  description:
    "Portfolio of Vaibhav — Rust and C++ at the core, MERN for full-stack products.",
  keywords: [
    "Vaibhav",
    "Rust developer",
    "C++ developer",
    "MERN developer",
    "software developer",
    "portfolio",
  ],
  authors: [{ name: "Vaibhav" }],
  creator: "Vaibhav",
  openGraph: {
    title: "Vaibhav — Rust & C++ Developer",
    description:
      "Rust and C++ at the core. MERN for full-stack products.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav — Rust & C++ Developer",
    description:
      "Rust and C++ at the core. MERN for full-stack products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
