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
  title: "Kawanua Tumou Tou",
  description: "Kawanua Tumou Tou Web for Derawan village",
  icons: {
    icon: "/logo-tim.jpg",
    other: [
      {
        rel: "icon",
        url: "/logo-tim.jpg",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/logo-tim.jpg",
        sizes: "16x16",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
