import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
  Instrument_Serif,
  Cinzel,
  Cinzel_Decorative,
  Monoton,
  Orbitron,
  Doto,
  Caveat,
} from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const monoton = Monoton({
  variable: "--font-monoton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aadarsh Reddy Depa | Full Stack Developer",
  description: "Personal portfolio showcasing my work and skills.",
  icons: {
    icon: "/Logo/AR.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${instrumentSerif.variable} ${cinzel.variable} ${cinzelDecorative.variable} ${monoton.variable} ${orbitron.variable} ${doto.variable} ${caveat.variable} antialiased bg-background text-foreground selection:bg-white/20 selection:text-white transition-colors duration-300`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
