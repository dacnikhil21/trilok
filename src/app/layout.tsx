import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eSaleAgreement | Secure • Verified • Trusted",
  description: "Indian Digital Agreement Platform",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="h-full w-full overflow-hidden bg-white font-sans text-foreground selection:bg-primary selection:text-surface">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
