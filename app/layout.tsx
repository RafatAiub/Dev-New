import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dev News - Signals from the builders shaping tomorrow",
  description: "Stay updated with the latest tech news, tutorials, and insights from developers and tech companies worldwide.",
  keywords: ["tech news", "developer news", "programming", "web development", "AI", "coding"],
  authors: [{ name: "Dev News Team" }],
  openGraph: {
    title: "Dev News",
    description: "Signals from the builders shaping tomorrow",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${sora.variable}`}>
      <body className="min-h-screen text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
