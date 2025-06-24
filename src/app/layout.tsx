import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { PiRankingLight } from "react-icons/pi";
import { GoGraph } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { NextAuthProvider } from "@/lib/NextAuthProvider";
import UserButtons from "@/components/UserButtons";
import Image from "next/image";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-18`}
      >
        {/* ロゴはまた後で決める */}
        <h1 className="text-yellow-500 font-bold mx-2 flex justify-between items-center">
          <Link href="/" className="text-7xl">
            KENSUIOU
            <Image width={128} height={32} src="/title_aquatans.png" alt="" />
          </Link>
          <NextAuthProvider session={session}><UserButtons/></NextAuthProvider>
        </h1>
        {children}
        <footer className="fixed bottom-0 w-full bg-yellow-600 px-2">
          <div className="flex justify-between md:w-2/3 mx-auto">
            <Link className="no-underline text-white flex flex-col items-center" href="/">
              <PiRankingLight stroke="#ffffff" size="2em" />
              ランキング
            </Link>
            <Link className="no-underline text-white flex flex-col items-center" href="/graph">
              <GoGraph stroke="#ffffff" size="2em" />
              グラフ
            </Link>
            <Link className="no-underline text-white flex flex-col items-center" href="/members">
              <GoPerson stroke="#ffffff" size="2em" />
              個人
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
