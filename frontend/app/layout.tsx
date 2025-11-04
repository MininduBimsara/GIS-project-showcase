import type { Metadata } from "next";
import { Inter, Merriweather, Lora } from "next/font/google";
import "./globals.css";

// Professional Sans-serif font for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Elegant Serif font for headings and formal text
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

// Alternative Serif font
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GIS for Sri Lankan Government",
  description:
    "Professional Geographic Information System solutions for Sri Lankan government organizations and departments",
  keywords: [
    "GIS",
    "Geographic Information Systems",
    "Sri Lanka",
    "Government",
    "Mapping",
    "Spatial Data",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        {/* ...other head tags if needed... */}
      </head>
      <body
        className={`${inter.variable} ${merriweather.variable} ${lora.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
