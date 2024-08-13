import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DataProvider } from '../store/GlobalState'
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pakaak - Fresh Chicken Delivery",
  description: "Pakaak is the ultimate app for on-demand, high-quality chicken delivery. Get your favorite cuts delivered in no time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DataProvider>
      <html lang="en">
        <head>
          <Script
            src="https://sdk.cashfree.com/js/v3/cashfree.js"
            strategy="afterInteractive" // Ensures the script loads before your app's JavaScript
            async
          />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </DataProvider>

  );
}

