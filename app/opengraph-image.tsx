import { ImageResponse } from "next/og";
import { formatDate, journal, nav, openSource, projects, site, taglines } from "@/lib/site";

export const alt = site.metadata;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const haze = "#e8eef2";
const muted = "#93a3af";
const line = "rgb(190 215 230 / 0.26)";
const signal = "#7fb98f";

async function loadFont(family: string, text: string, weight = 400) {
  try {
    const cssRes = await fetch(
      `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(
        text
      )}`
    );
    const css = await cssRes.text();
    const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1];
    if (!fontUrl) return null;
    const fontRes = await fetch(fontUrl);
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

const eyebrow = "// Software · AI · Languages";
const lead =
  "I build production AI systems that hold up under real use: retrieval pipelines, LLM features with guardrails, and the full-stack products around them.";

const work = projects
  .filter((project) => project.featured)
  .map((project) => ({ label: project.title, note: taglines[project.slug] ?? "" }));
const posts = journal.slice(0, 3).map((post) => ({ label: post.date.slice(0, 7), note: post.title }));
const status = [
  { label: "Roles", value: "Open" },
  { label: "Scope", value: "Boston / remote" },
  { label: "Auth", value: "US citizen" },
];
const repo = [
  { label: "Repo", value: openSource.repo },
  { label: "PR", value: `#${openSource.pr}` },
  { label: "Diff", value: openSource.diff },
  { label: "Merged", value: formatDate(openSource.merged) },
];
const navItems = nav.map((item) => `[${item.code}] ${item.label}`);
const coords = "42.3601° N  71.0589° W";
const ticks = ["000", "090", "180", "270", "360"];

// The hero's "neon" flow field, drawn as static ribbons since ImageResponse can't run the canvas.
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

const crosshairs = [
  { left: 392, top: 118 },
  { left: 968, top: 82 },
  { left: 640, top: 545 },
  { left: 370, top: 520 },
];

// Lucide's React icons are client components, which ImageResponse can't call, and
// Satori can't serialize fragments inside an <svg>, so these are flat keyed arrays.
const icons = {
  work: [
    <path key="a" d="M12 12h.01" />,
    <path key="b" d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />,
    <path key="c" d="M22 13a18.15 18.15 0 0 1-20 0" />,
    <rect key="d" width="20" height="14" x="2" y="6" rx="2" />,
  ],
  status: [
    <path key="a" d="M16.247 7.761a6 6 0 0 1 0 8.478" />,
    <path key="b" d="M19.075 4.933a10 10 0 0 1 0 14.134" />,
    <path key="c" d="M4.925 19.067a10 10 0 0 1 0-14.134" />,
    <path key="d" d="M7.753 16.239a6 6 0 0 1 0-8.478" />,
    <circle key="e" cx="12" cy="12" r="2" />,
  ],
  writing: [
    <path key="a" d="M13 21h8" />,
    <path
      key="b"
      d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
    />,
  ],
  merge: [
    <circle key="a" cx="18" cy="18" r="3" />,
    <circle key="b" cx="6" cy="6" r="3" />,
    <path key="c" d="M6 21V9a9 9 0 0 0 9 9" />,
  ],
};

function Panel({
  icon,
  title,
  width,
  children,
}: {
  icon: keyof typeof icons;
  title: string;
  width: number;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width, border: `1px solid ${line}`, background: "rgb(3 6 10 / 0.84)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", fontSize: 14, fontWeight: 500 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke={muted}
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {icons[icon]}
          </svg>
          {title}
        </div>
        <span style={{ color: muted }}>→</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center", borderTop: `1px solid ${line}`, padding: "6px 12px" }}>
        {children}
      </div>
    </div>
  );
}

function ListRows({ rows, labelWidth, dimLabel }: { rows: { label: string; note: string }[]; labelWidth: number; dimLabel?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {rows.map((row, i) => (
        <div
          key={row.label}
          style={{
            display: "flex",
            gap: 12,
            padding: "8px 0",
            fontSize: 14,
            borderBottom: i < rows.length - 1 ? "1px dashed rgb(190 215 230 / 0.1)" : "none",
          }}
        >
          <span style={{ width: labelWidth, flexShrink: 0, color: dimLabel ? muted : haze, fontWeight: dimLabel ? 400 : 500 }}>
            {row.label}
          </span>
          <span style={{ flexGrow: 1, flexShrink: 1, color: "#b9c6ce", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {row.note}
          </span>
        </div>
      ))}
    </div>
  );
}

function StatRows({ rows, dot }: { rows: { label: string; value: string }[]; dot?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {rows.map((row) => (
        <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", fontSize: 13 }}>
          <span>{row.label}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8, color: muted }}>
            {row.value}
            {dot && row.label === "Roles" ? <span style={{ width: 8, height: 8, background: dot }} /> : null}
          </span>
        </div>
      ))}
    </div>
  );
}

export default async function OpengraphImage() {
  const bodyText = [
    eyebrow,
    lead,
    ...navItems,
    coords,
    ...ticks,
    "→… Selected work Writing Status Open source",
    ...work.flatMap((row) => [row.label, row.note]),
    ...posts.flatMap((row) => [row.label, row.note]),
    ...status.flatMap((row) => [row.label, row.value]),
    ...repo.flatMap((row) => [row.label, row.value]),
  ].join("");

  const [nameData, bodyData, boldData, logoData] = await Promise.all([
    loadFont("IBM Plex Mono", site.name),
    loadFont("JetBrains Mono", bodyText),
    loadFont("JetBrains Mono", bodyText, 500),
    loadFont("Pochaevsk", "М"),
  ]);

  const fonts = [
    nameData && { name: "Plex", data: nameData, style: "normal" as const, weight: 400 as const },
    bodyData && { name: "JetBrains", data: bodyData, style: "normal" as const, weight: 400 as const },
    boldData && { name: "JetBrains", data: boldData, style: "normal" as const, weight: 500 as const },
    logoData && { name: "Pochaevsk", data: logoData, style: "normal" as const, weight: 400 as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  const [first, ...rest] = site.name.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#03060a",
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(flowField)}")`,
          color: haze,
          fontFamily: bodyData ? "JetBrains" : "monospace",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage: "linear-gradient(to right, rgb(3 6 10 / 0.8), rgb(3 6 10 / 0.4) 36%, rgb(3 6 10 / 0.1) 55%)",
          }}
        />
        {crosshairs.map(({ left, top }) => (
          <div key={`${left}-${top}`} style={{ position: "absolute", left, top, width: 28, height: 28, display: "flex" }}>
            <div style={{ position: "absolute", left: 0, top: 14, width: 28, height: 1, background: "rgb(232 238 242 / 0.45)" }} />
            <div style={{ position: "absolute", left: 14, top: 0, width: 1, height: 28, background: "rgb(232 238 242 / 0.45)" }} />
            <div style={{ position: "absolute", left: 6, top: 6, width: 16, height: 16, border: "1px solid rgb(232 238 242 / 0.45)" }} />
          </div>
        ))}

        <div style={{ position: "relative", display: "flex", flexDirection: "column", width: 1200, height: 630 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: 70,
              padding: "0 56px",
              borderBottom: `1px solid ${line}`,
              fontSize: 14,
              color: muted,
            }}
          >
            <span style={{ fontFamily: logoData ? "Pochaevsk" : "serif", fontSize: 36, color: haze, marginRight: 40 }}>М</span>
            <div style={{ display: "flex", gap: 30, flexGrow: 1 }}>
              {navItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <span>{coords}</span>
          </div>

          <div style={{ display: "flex", flexGrow: 1, alignItems: "center", gap: 40, padding: "0 56px" }}>
            <div style={{ display: "flex", flexDirection: "column", width: 380, flexShrink: 0 }}>
              <span style={{ fontSize: 15, color: muted }}>{eyebrow}</span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 18,
                  fontSize: 72,
                  lineHeight: 1.02,
                  letterSpacing: -0.7,
                  fontFamily: nameData ? "Plex" : "monospace",
                }}
              >
                <span>{first}</span>
                <span style={{ display: "flex", alignItems: "flex-end" }}>
                  {rest.join(" ")}
                  <span style={{ width: 36, height: 5, marginLeft: 3, marginBottom: 12, background: haze }} />
                </span>
              </div>
              <span style={{ marginTop: 24, fontSize: 16, lineHeight: 1.65, color: "#c7d2d9" }}>{lead}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <Panel icon="work" title="Selected work" width={440}>
                  <ListRows rows={work} labelWidth={104} />
                </Panel>
                <Panel icon="status" title="Status" width={220}>
                  <StatRows rows={status} dot={signal} />
                </Panel>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <Panel icon="writing" title="Writing" width={440}>
                  <ListRows rows={posts} labelWidth={72} dimLabel />
                </Panel>
                <Panel icon="merge" title="Open source" width={220}>
                  <StatRows rows={repo} />
                </Panel>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 56px 26px",
              paddingTop: 12,
              borderTop: `1px dashed ${line}`,
              fontSize: 11,
              color: muted,
            }}
          >
            {ticks.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
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
