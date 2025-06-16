"use client";

import BarGraph from "@/components/BarGraph";
import Rankings from "@/components/Rankings";
import { tRecord } from "@/components/ChartWithRankingsTS";

export default function ChartWithRankings({ record }: { record: tRecord }) {
  console.log("record.period:", record.period); // ここでログを出力
  return (
    <div className="mx-4 h-full">
      {record.period === "day" && (
        <div>
          <h2>Day</h2>
          <Rankings rankings={record.rankings} />
          <BarGraph rawChartConfig={record.rawChartConfig} />
        </div>
      )}
      {record.period === "week" && (
        <div>
          <h2>Week</h2>
          <Rankings rankings={record.rankings} />
          <BarGraph rawChartConfig={record.rawChartConfig} />
        </div>
      )}
      {record.period === "all" && (
        <div>
          <h2>All</h2>
          <Rankings rankings={record.rankings} />
          <BarGraph rawChartConfig={record.rawChartConfig} />
        </div>
      )}
    </div>
  );
}
