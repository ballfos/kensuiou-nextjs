import ChartWithRankings from "@/components/ChartWithRanking";
import { tData } from "@/components/ChartWithRankingsTS";
export default function DayWeekAllChartWithRanking({ data }: { data: tData }) {
  return (
    <div>
      <p className="text-3xl text-center font-bold">{data.category}</p>
      <div className="grid mx-4 h-full grid-cols-3">
        {data.records.map((d, index) => (
          <ChartWithRankings key={index} record={d} />
        ))}
      </div>
    </div>
  );
}
