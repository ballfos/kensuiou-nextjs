import ChartWithRankings from "@/components/ChartWithRanking";
import { tData } from "@/components/ChartWithRankingsTS";
export default function DayWeekAllChartWithRanking({ data }: { data: tData }) {
  return (
    <div>
      <strong>
        <div className="flex items-center">{data.category}</div>
      </strong>
      <div className="grid mx-4 h-full grid-cols-3">
        {data.records.map((d, index) => (
          <ChartWithRankings key={JSON.stringify(d)} record={d} />
        ))}
      </div>
    </div>
  );
}
