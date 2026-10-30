import type { Metadata } from "next";
import {
  EB_Garamond,
  IBM_Plex_Mono,
  Kurale,
  Newsreader,
  Noto_Naskh_Arabic,
  Noto_Serif_JP,
  Pochaevsk,
} from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/lib/site";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
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

const kurale = Kurale({
  variable: "--font-kurale",
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["greek", "cyrillic"],
  preload: false,
});

const notoJp = Noto_Serif_JP({
  variable: "--font-noto-jp",
  weight: ["400", "600"],
  preload: false,
});

const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  preload: false,
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
      className={`${newsreader.variable} ${plexMono.variable} ${pochaevsk.variable} ${kurale.variable} ${garamond.variable} ${notoJp.variable} ${naskh.variable} h-full scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full font-sans">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
