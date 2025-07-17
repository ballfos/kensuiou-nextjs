import BottomNav from "@/components/BottomNav";
import UserButtons from "@/components/UserButtons";
import { authOptions } from "@/lib/auth";
import { NextAuthProvider } from "@/lib/NextAuthProvider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
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
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} pb-18 antialiased`}
      >
        {/* ロゴはまた後で決める */}
        <header>
          <div>
            <h1 className="mx-2 flex items-center justify-between font-bold text-yellow-500">
              <Link href="/" className="text-5xl sm:text-6xl">
                KENSUIOU
              </Link>
              <NextAuthProvider session={session}>
                <UserButtons />
              </NextAuthProvider>
            </h1>
          </div>
          <Image width={128} height={32} src="/title_aquatans.png" alt="" />
        </header>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
