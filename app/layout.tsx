import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vaibhav — Software Developer",
  description:
    "Software developer focused on Rust, C++, backend fundamentals, and full-stack web development with MERN.",
  keywords: [
    "Vaibhav",
    "software developer",
    "Rust",
    "C++",
    "MERN",
    "backend developer",
    "portfolio",
  ],
  authors: [{ name: "Vaibhav" }],
  creator: "Vaibhav",
  openGraph: {
    title: "Vaibhav — Software Developer",
    description:
      "Rust and C++ focused software development, with MERN for full-stack web applications.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav — Software Developer",
    description:
      "Rust and C++ focused software development, with MERN for full-stack web applications.",
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
