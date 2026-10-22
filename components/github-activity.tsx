import { ActivityHeatmap, type ActivityDay } from "@/components/arc/activity-heatmap/activity-heatmap";
import { site } from "@/lib/site";

const username = site.github.split("/").pop();

async function getContributions(): Promise<ActivityDay[] | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 86400 }, signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return null;
    const data: { contributions: ActivityDay[] } = await res.json();
    return data.contributions.map(({ date, count }) => ({ date, count }));
  } catch {
    return null;
  }
}

export async function GithubActivity() {
  const days = await getContributions();
  const profile = (
    <a
      href={site.github}
      className="font-mono text-[11px] text-muted-foreground hover:text-primary"
    >
      {username} on GitHub ↗
    </a>
  );

  if (!days) {
    return (
      <p className="flex flex-wrap items-baseline justify-between gap-4 text-sm text-muted-foreground">
        Contribution graph unavailable right now.
        {profile}
      </p>
    );
  }

  return (
    <ActivityHeatmap
      className="arc"
      days={days}
      label="GitHub contributions in the last year"
      period="the last year"
      actions={profile}
    />
  );
}
