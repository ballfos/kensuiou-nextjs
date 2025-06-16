import ChartWithRankings from "@/components/ChartWithRanking";
import { tData } from "@/components/ChartWithRankingsTS";
export default function DayWeekAllChartWithRanking({ data }: { data: tData }) {
  return (
    <div className="mx-4 h-full">
      {data.category}
      {data.records.map((d, index) => (
        <ChartWithRankings key={JSON.stringify(d)} record={d} />
      ))}
    </div>
  );
}
