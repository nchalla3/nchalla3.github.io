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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/katex.min.css"
          crossOrigin="anonymous"
        />
        {/* Prevent flash of unstyled content on theme load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){var r=document.documentElement;r.classList.add('light');r.style.setProperty('--background','#f8fafc');r.style.setProperty('--foreground','#0f172a');r.style.setProperty('--accent','#0d9488');r.style.setProperty('--surface','#f1f5f9');r.style.setProperty('--card','#ffffff');r.style.setProperty('--border','#e2e8f0');}}catch(e){}})();`,
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
