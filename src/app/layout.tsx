import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { PiRankingLight } from "react-icons/pi";
import { GoGraph } from "react-icons/go";
import { FiFileText } from "react-icons/fi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KENSUIOU",
  description: "懸垂の王を目指せ!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-30`}
      >
        {/* ロゴはまた後で決める */}
        <h1 className="text-7xl text-yellow-500 font-bold m-2">
          <Link href="/">KENSUIOU</Link>
        </h1>
        {children}
        <footer className="fixed bottom-0 w-full bg-yellow-600 p-2">
          <div className="flex justify-between md:w-2/3 mx-auto">
            <Link className="no-underline text-white text-2xl flex flex-col items-center" href="/">
              <PiRankingLight stroke="#ffffff" size="2em" />
              ランキング
            </Link>
            <Link className="no-underline text-white text-2xl flex flex-col items-center" href="/graph">
              <GoGraph stroke="#ffffff" size="2em" />
              グラフ
            </Link>
            <Link className="no-underline text-white text-2xl flex flex-col items-center" href="/members">
              <FiFileText stroke="#ffffff" size="2em" />
              個人
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
