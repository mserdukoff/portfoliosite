import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

async function loadPochaevsk() {
  const cssRes = await fetch(
    "https://fonts.googleapis.com/css2?family=Pochaevsk&text=%D0%9C"
  );
  const css = await cssRes.text();
  const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1];
  if (!fontUrl) return null;
  const fontRes = await fetch(fontUrl);
  return fontRes.arrayBuffer();
}

export default async function Icon() {
  const fontData = await loadPochaevsk();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#020201",
          color: "#efebe2",
          fontSize: 24,
          fontFamily: fontData ? "Pochaevsk" : "serif",
        }}
      >
        М
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: "Pochaevsk", data: fontData, style: "normal", weight: 400 }]
        : undefined,
    }
  );
}
