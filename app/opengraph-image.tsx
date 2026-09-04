import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.metadata;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(family: string, text: string, weight = 400) {
  const cssRes = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(
      text
    )}`
  );
  const css = await cssRes.text();
  const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1];
  if (!fontUrl) return null;
  const fontRes = await fetch(fontUrl);
  return fontRes.arrayBuffer();
}

export default async function OpengraphImage() {
  const [markData, nameData, roleData, leadData] = await Promise.all([
    loadFont("Pochaevsk", "М"),
    loadFont("Newsreader", site.name, 600),
    loadFont(
      "Geist",
      `${site.role} — ${site.location} — ${site.status}`,
      500
    ),
    loadFont("Geist", site.homepageLead, 400),
  ]);

  const fonts = [
    markData && { name: "Pochaevsk", data: markData, style: "normal" as const, weight: 400 as const },
    nameData && { name: "Newsreader", data: nameData, style: "normal" as const, weight: 600 as const },
    roleData && { name: "Geist", data: roleData, style: "normal" as const, weight: 500 as const },
    leadData && { name: "Geist", data: leadData, style: "normal" as const, weight: 400 as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#020201",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 56,
            lineHeight: 1,
            color: "#c96736",
            fontFamily: markData ? "Pochaevsk" : "serif",
          }}
        >
          М
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              lineHeight: 1.05,
              color: "#efebe2",
              fontFamily: nameData ? "Newsreader" : "serif",
              fontWeight: 600,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#c96736",
              fontFamily: roleData ? "Geist" : "sans-serif",
              fontWeight: 500,
              letterSpacing: 0.5,
            }}
          >
            {site.role} · {site.location} · {site.status}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 880,
              fontSize: 28,
              lineHeight: 1.5,
              color: "#8d8980",
              fontFamily: leadData ? "Geist" : "sans-serif",
              fontWeight: 400,
            }}
          >
            {site.homepageLead}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    }
  );
}
