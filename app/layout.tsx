import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Newsreader,
  Pochaevsk,
  Schibsted_Grotesk,
} from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/lib/site";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const pochaevsk = Pochaevsk({
  variable: "--font-pochaevsk",
  subsets: ["cyrillic"],
  weight: "400",
});

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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${schibsted.variable} ${plexMono.variable} ${newsreader.variable} ${pochaevsk.variable} h-full scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full font-sans">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
