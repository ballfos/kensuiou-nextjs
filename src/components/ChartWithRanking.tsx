"use client";

import BarGraph from "@/components/BarGraph";
import Rankings from "@/components/Rankings";
import { tRecord } from "@/components/ChartWithRankingsTS";

export default function ChartWithRankings({ record }: { record: tRecord }) {
  return (
    <div className="mx-4 h-full">
      <Rankings rankings={record.rankings} />
      <BarGraph rawChartConfig={record.rawChartConfig} />
    </div>
  );
}
