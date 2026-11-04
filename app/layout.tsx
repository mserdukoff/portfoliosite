import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Mono,
  JetBrains_Mono,
  Newsreader,
  Noto_Naskh_Arabic,
  Noto_Serif_JP,
  Pochaevsk,
} from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/lib/site";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

const pochaevsk = Pochaevsk({
  variable: "--font-pochaevsk",
  subsets: ["cyrillic"],
  weight: "400",
});

// Display-only script specimens, so none is worth a preload.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  preload: false,
});

const notoJp = Noto_Serif_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

const notoArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#03060a",
};

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.metadata,
  authors: [{ name: site.name }],
  openGraph: {
    title: site.name,
    description: site.metadata,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: site.xHandle,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${plexMono.variable} ${pochaevsk.variable} ${newsreader.variable} ${notoJp.variable} ${notoArabic.variable} h-full scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full font-sans">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
