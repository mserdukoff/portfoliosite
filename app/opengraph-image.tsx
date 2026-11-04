import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.metadata;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(family: string, text: string, weight = 400) {
  const cssRes = await fetch(
    `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(
      text
    )}`
  );
  const css = await cssRes.text();
  const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1];
  if (!fontUrl) return null;
  const fontRes = await fetch(fontUrl);
  return fontRes.arrayBuffer();
}

const eyebrow = `// ${site.role} · ${site.location} · ${site.status}`;

export default async function OpengraphImage() {
  const [nameData, bodyData] = await Promise.all([
    loadFont("IBM Plex Mono", `${site.name}_`),
    loadFont("JetBrains Mono", `${eyebrow}${site.homepageLead}`),
  ]);

  const fonts = [
    nameData && { name: "Plex", data: nameData, style: "normal" as const, weight: 400 as const },
    bodyData && { name: "JetBrains", data: bodyData, style: "normal" as const, weight: 400 as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          padding: "64px 72px",
          color: "#e8eef2",
          backgroundColor: "#03060a",
          fontFamily: bodyData ? "JetBrains" : "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#93a3af", letterSpacing: 1 }}>
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            lineHeight: 1,
            fontFamily: nameData ? "Plex" : "monospace",
          }}
        >
          {site.name}_
        </div>
        <div style={{ display: "flex", maxWidth: 960, fontSize: 25, lineHeight: 1.55, color: "#c7d2d9" }}>
          {site.homepageLead}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    }
  );
}
