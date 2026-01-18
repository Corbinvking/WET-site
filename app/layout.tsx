import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, TrendingStrip, Footer } from "@/components/global";
import { DrawerProvider } from "@/context/DrawerContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "W.E.T. | World Event Trading",
  description: "The newsroom built for prediction market traders. CNN-style coverage with market-native framing.",
  keywords: ["prediction markets", "news", "trading", "Kalshi", "Polymarket", "politics", "economy"],
  authors: [{ name: "W.E.T." }],
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "W.E.T. | World Event Trading",
    description: "The newsroom built for prediction market traders.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "W.E.T. | World Event Trading",
    description: "The newsroom built for prediction market traders.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <DrawerProvider>
          <Header />
          <TrendingStrip />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </DrawerProvider>
      </body>
    </html>
  );
}
