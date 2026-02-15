import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Narang Education - Platform Bimbingan Belajar SD",
  description: "Platform bimbingan belajar SD terbaik dengan sistem modern, materi lengkap, game edukasi, dan absensi barcode.",
  keywords: ["Narang Education", "Bimbingan Belajar", "SD", "LMS", "Pendidikan", "E-Learning"],
  authors: [{ name: "Narang Education Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Narang Education",
    description: "Platform bimbingan belajar SD terbaik",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-background text-foreground font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
