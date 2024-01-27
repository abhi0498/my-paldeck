import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });
//directly get the items through the dropped items

export const viewport: Viewport = {
  themeColor: "black",
  // viewPort:
  //   "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  userScalable: false,
  viewportFit: "cover",
};
export const metadata: Metadata = {
  title: "PalDeck | PalWorld | Data on all Pals",
  description:
    "Explore the PalWorld universe and collect your favorite pals. Get information about their stats, moves, and more.",
  generator: "PalDex",
  manifest: "/manifest.json",
  keywords: ["paldex", "pals", "palworld", "pokemon", "dex", "paldeck"],
  authors: [{ name: "Abhishek V" }],

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
    <html lang="en" data-theme="dark">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
