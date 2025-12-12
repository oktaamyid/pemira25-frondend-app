import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "#AyoVote | PEMILIHAN RAYA MAHASISWA STTNF 2025",
  description: "Pemilihan Raya Mahasiswa STT Terpadu Nurul Fikri",
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="grow pt-24">
            {children}
          </main>
          <Footer />
          <FloatingChat />
        </div>
      </body>
    </html>
  );
}
