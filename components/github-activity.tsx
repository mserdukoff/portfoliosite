import { site } from "@/lib/site";

export function GithubActivity() {
  const username = site.github.split("/").pop();

  return (
    <div className="rail-panel overflow-hidden">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        GitHub activity
      </p>
      <div className="mt-4 -mx-2 overflow-x-auto">
        <img
          src={`https://ghchart.rshah.org/c96736/${username}`}
          alt={`${username}'s GitHub contribution graph`}
          className="min-w-[640px] px-2"
          loading="lazy"
        />
      </div>
      <a
        href={site.github}
        className="mt-3 inline-block font-mono text-[11px] text-muted-foreground hover:text-primary"
      >
        {username} on GitHub ↗
      </a>
    </div>
  );
}
