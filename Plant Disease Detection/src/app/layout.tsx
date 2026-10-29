import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlantDoc AI — Plant Disease Detection",
  description:
    "Upload a photo of your plant and let AI detect diseases, pests, and nutrient deficiencies instantly. Get symptoms, causes, and treatment recommendations powered by vision AI.",
  keywords: [
    "plant disease detection",
    "plant health",
    "AI plant diagnosis",
    "crop disease",
    "leaf disease",
    "agriculture AI",
    "PlantDoc",
  ],
  authors: [{ name: "PlantDoc AI" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "PlantDoc AI — Plant Disease Detection",
    description: "Detect plant diseases instantly with AI. Get treatment recommendations and prevention tips.",
    siteName: "PlantDoc AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlantDoc AI — Plant Disease Detection",
    description: "Detect plant diseases instantly with AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
