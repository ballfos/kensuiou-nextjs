"use client";

import BarGraph from "@/components/BarGraph";
import Ranking from "@/components/Ranking";
import { tRecord } from "@/lib/TypeDeclarations";

export default function ChartWithRanking({ record }: { record: tRecord }) {
  return (
    <div className="mx-4 h-full">
      <h2 className="text-6xl font-bold text-center">{record.type}</h2>
      <Ranking rankingData={record.barChartData.slice(0, 3)} />
      <BarGraph barChartData={record.barChartData} />
    </div>
  );
}
