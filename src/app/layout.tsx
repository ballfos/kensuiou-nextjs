import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {/* ロゴはまた後で決める */}
                <h1 className="text-4xl text-yellow-500 font-bold m-2"><Link href="/">KENSUIOU</Link></h1>
                {children}
                <footer className="flex justify-between md:w-2/3 bg-yellow-600 my-2 mx-auto p-2">
                    <Link className="no-underline text-white text-2xl" href="/">ランキング</Link>
                    <Link className="no-underline text-white text-2xl" href="/graph">グラフ</Link>
                    <Link className="no-underline text-white text-2xl" href="/members">個人</Link>
                </footer>
            </body>
        </html>
    );
}
