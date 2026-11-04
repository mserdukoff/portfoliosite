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

// Mirrors the hero's "neon" flow-field palette: near-black water, blue/teal/orange
// currents. Drawn as a static set of ribbons since ImageResponse can't run the canvas.
const flowField = `
<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630' viewBox='0 0 1200 630'>
  <rect width='1200' height='630' fill='#03060a'/>
  <g fill='none' stroke-linecap='round'>
    <path d='M-60 90 C 180 150, 320 10, 560 80 S 900 190, 1260 40' stroke='rgba(255,85,25,.3)' stroke-width='2'/>
    <path d='M-60 140 C 200 200, 360 50, 600 120 S 940 230, 1260 90' stroke='rgba(35,190,195,.22)' stroke-width='1.4'/>
    <path d='M-60 250 C 220 190, 400 320, 660 240 S 1000 120, 1260 220' stroke='rgba(30,90,190,.3)' stroke-width='1.6'/>
    <path d='M-60 430 C 220 350, 380 500, 640 400 S 980 220, 1260 320' stroke='rgba(30,90,190,.32)' stroke-width='2'/>
    <path d='M-60 470 C 240 390, 410 540, 680 440 S 1010 260, 1260 360' stroke='rgba(35,190,195,.24)' stroke-width='1.5'/>
    <path d='M-60 540 C 260 470, 420 600, 690 500 S 1020 330, 1260 420' stroke='rgba(255,170,60,.18)' stroke-width='1.3'/>
  </g>
</svg>`;

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
          backgroundColor: "#03060a",
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(flowField)}")`,
        }}
      >
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
            backgroundImage:
              "linear-gradient(to right, rgb(3 6 10 / 0.85), rgb(3 6 10 / 0.6) 50%, rgb(3 6 10 / 0.3))",
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
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    }
  );
}
