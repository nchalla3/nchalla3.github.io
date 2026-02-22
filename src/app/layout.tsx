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
  title: "Naveen Challa — Software Engineer",
  description:
    "Personal portfolio of Naveen Challa, a software engineer specializing in full-stack development and scalable systems.",
  openGraph: {
    title: "Naveen Challa — Software Engineer",
    description:
      "Personal portfolio of Naveen Challa, a software engineer specializing in full-stack development and scalable systems.",
    url: "https://nchalla3.github.io",
    siteName: "Naveen Challa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-slate-300`}
      >
        {children}
      </body>
    </html>
  );
}
