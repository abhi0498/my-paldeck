import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
//directly get the items through the dropped items

export const metadata: Metadata = {
  title: "PalDex | PalWorld",
  description:
    "Explore the PalWorld universe and collect your favorite pals. Get information about their stats, moves, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="JuZ3s6TtZy0glew22_GpnS5UHDwnqffU25GQf4DWyys"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
