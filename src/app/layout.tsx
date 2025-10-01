import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
// import Provider from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gumball Stream - The Amazing World of Gumball",
  description: "Stream all episodes of The Amazing World of Gumball",
  icons: {
    icon: "./logo.webp"
  },
  openGraph: {
    title: "Gumball Stream - The Amazing World of Gumball",
    description: "Stream all episodes of The Amazing World of Gumball",
    url: "https://gumball-streaming.vercel.app",
    siteName: "Gumball Streaming",
    images: [
      {
        url: "/seo-image.webp",
        width: 1200,
        height: 630,
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
