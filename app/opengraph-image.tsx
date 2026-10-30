import { ImageResponse } from "next/og";
import { hero, place, site } from "@/lib/site";

export const alt = site.metadata;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const disciplines = hero.disciplines.map((row) => row.join("  ×  ").toUpperCase());

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

export default async function OpengraphImage() {
  const [markData, slavonicData, serifData, monoData] = await Promise.all([
    loadFont("Pochaevsk", "М"),
    loadFont("Kurale", site.name),
    loadFont("Newsreader", site.role),
    loadFont("IBM Plex Mono", `${disciplines.join("")}${place.name}${place.lat}${place.lon}${site.location}`.toUpperCase()),
  ]);

  const fonts = [
    markData && { name: "Pochaevsk", data: markData, style: "normal" as const, weight: 400 as const },
    slavonicData && { name: "Kurale", data: slavonicData, style: "normal" as const, weight: 400 as const },
    serifData && { name: "Newsreader", data: serifData, style: "normal" as const, weight: 400 as const },
    monoData && { name: "Plex Mono", data: monoData, style: "normal" as const, weight: 400 as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  const mark = markData ? "Pochaevsk" : "serif";
  const slavonic = slavonicData ? "Kurale" : "serif";
  const serif = serifData ? "Newsreader" : "serif";
  const mono = monoData ? "Plex Mono" : "monospace";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ebe5d8", color: "#1e1c19" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", width: 780 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 28 }}>
            <div style={{ display: "flex", fontFamily: mark, fontSize: 52, lineHeight: 1, color: "#16223a" }}>М</div>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: mono, fontSize: 15, letterSpacing: 2.5, lineHeight: 1.7 }}>
              <span>{place.name.toUpperCase()}</span>
              <span style={{ color: "#645e54" }}>
                {place.lat}  {place.lon}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: slavonic, fontSize: 112, lineHeight: 0.98 }}>
              <span>Matt</span>
              <span>Serdukoff</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 28, fontFamily: mono, fontSize: 17, letterSpacing: 3, lineHeight: 1.9 }}>
              {disciplines.map((row) => (
                <span key={row}>{row}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "flex-end", background: "#16223a", color: "#ebe5d8", padding: "56px 48px", position: "relative" }}>
          <div style={{ position: "absolute", top: 64, left: 48, width: 96, height: 96, borderRadius: 999, background: "#b4523a" }} />
          <div style={{ display: "flex", fontFamily: serif, fontSize: 30, lineHeight: 1.3 }}>{site.role}</div>
          <div style={{ display: "flex", marginTop: 18, fontFamily: mono, fontSize: 14, letterSpacing: 3, opacity: 0.7 }}>
            {site.location.toUpperCase()}
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
