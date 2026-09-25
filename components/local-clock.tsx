"use client";

import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/New_York",
  timeZoneName: "shortOffset",
});

function readParts(date: Date) {
  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return {
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    period: get("dayPeriod"),
    zone: get("timeZoneName").replace("GMT", "UTC"),
  };
}

export function LocalClock() {
  const [time, setTime] = useState<ReturnType<typeof readParts> | null>(null);

  useEffect(() => {
    const tick = () => setTime(readParts(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return <span className="inline-block w-[9ch]" />;

  return (
    <span className="inline-flex items-baseline gap-1 tabular-nums">
      <NumberFlowGroup>
        <span className="inline-flex items-baseline">
          <NumberFlow value={time.hour} />
          <span>:</span>
          <NumberFlow value={time.minute} format={{ minimumIntegerDigits: 2 }} />
        </span>
      </NumberFlowGroup>
      <span>
        {time.period} {time.zone}
      </span>
    </span>
  );
}
