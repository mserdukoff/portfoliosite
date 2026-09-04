"use client";

import { RadarArea } from "@/components/charts/radar-area";
import { RadarAxis } from "@/components/charts/radar-axis";
import { RadarChart } from "@/components/charts/radar-chart";
import { RadarGrid } from "@/components/charts/radar-grid";
import { RadarLabels } from "@/components/charts/radar-labels";
import { languages } from "@/lib/site";

const metrics = languages.map((language) => ({
  key: language.name,
  label: language.name,
}));

const data = [
  {
    label: "Matt",
    color: "var(--primary)",
    values: Object.fromEntries(
      languages.map((language) => [language.name, language.score])
    ),
  },
];

export function LanguageRadar({
  className = "mx-auto w-full max-w-[19rem]",
  fontSize = 10.5,
}: {
  className?: string;
  fontSize?: number;
}) {
  return (
    <div className={className}>
      <RadarChart data={data} metrics={metrics} levels={4} margin={40}>
        <RadarGrid showLabels={false} />
        <RadarAxis />
        <RadarLabels fontSize={fontSize} />
        <RadarArea index={0} />
      </RadarChart>
    </div>
  );
}
