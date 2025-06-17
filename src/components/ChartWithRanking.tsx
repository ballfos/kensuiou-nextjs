"use client";

import BarGraph from "@/components/BarGraph";
import Rankings from "@/components/Rankings";
import { tRecord } from "@/components/BarGraphWithRankingTS";

export default function ChartWithRanking({ record }: { record: tRecord }) {
  return (
    <div className="mx-4 h-full">
      <h2 className="text-2xl font-bold text-center">{record.type}</h2>
      <Rankings rankingData={record.barChartData.slice(0, 3)} />
      <BarGraph barChartData={record.barChartData} />
    </div>
  );
}
