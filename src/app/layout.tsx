import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EurekaLab — Platform Eksplorasi Penemuan Sains Interaktif",
  description:
    "Setiap Penemuan Besar Berawal dari Sebuah Pertanyaan. Jelajahi kisah para ilmuwan, temukan ide yang mengubah dunia, dan pahami bagaimana sains membentuk kehidupan kita hari ini.",
  keywords: [
    "EurekaLab",
    "Sains",
    "Penemuan Ilmiah",
    "Ilmuwan Terkenal",
    "Fisika",
    "Teknologi",
    "Kedokteran",
    "Astronomi",
    "Simulasi Interaktif",
    "Edukasi Sains Indonesia",
    "Arfana Ridho",
  ],
  authors: [{ name: "Arfana Ridho", url: "https://www.linkedin.com/in/arfana-ridho-3b7463342" }],
  creator: "Arfana Ridho",
  openGraph: {
    title: "EurekaLab — Interactive Scientific Discovery Platform",
    description: "Every Great Discovery Begins With a Question. Eksplorasi sains interaktif dalam bahasa Indonesia.",
    type: "website",
    locale: "id_ID",
  },
};

import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${jakartaSans.variable} ${jetbrainsMono.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#07111F] text-[#F5F7FA] font-sans selection:bg-[#63E6FF] selection:text-[#07111F] antialiased">
        <Suspense fallback={<div className="h-16 sm:h-20 bg-[#07111F]" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <SearchModal />
      </body>
    </html>
  );
}
