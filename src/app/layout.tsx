import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
//directly get the items through the dropped items

export const metadata: Metadata = {
  title: "PalDeck | PalWorld",
  description:
    "Explore the PalWorld universe and collect your favorite pals. Get information about their stats, moves, and more.",
  generator: "PalDex",
  manifest: "/manifest.json",
  keywords: ["paldex", "pals", "palworld", "pokemon", "dex", "paldeck"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [{ name: "Abhishek V" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "images/types/Dark.png" },
    { rel: "icon", url: "images/types/Dark.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
