import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BuyMeCoffee from "./components/BuyMeCoffee";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Image Generator | Create Stunning AI Images Online",
  description: "Transform your ideas into stunning visuals with our free AI Image Generator. Create beautiful, unique images from text descriptions using state-of-the-art AI models.",
  keywords: "AI image generator, AI art, text to image, AI image creation, Stable Diffusion, free AI tool, AI artwork, image generation",
  authors: [{ name: "Debasish Barai" }],
  openGraph: {
    title: "AI Image Generator | Create Stunning AI Art",
    description: "Transform text into beautiful images with our free AI Image Generator. Create unique, high-quality visuals instantly.",
    url: "https://ai-image-generator.debasishbarai.com",
    siteName: "AI Image Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Generator | Create Amazing AI Art",
    description: "Transform text into beautiful images with our free AI Image Generator. No signup required.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-grow">
          {children}
        </main>
        <BuyMeCoffee />
      </body>
    </html>
  );
}
