import ChartWithRankings from "@/components/ChartWithRanking";
import { tData } from "@/components/BarGraphWithRankingTS";

export default async function DayWeekAllChartWithRanking({ data }: { data: tData }) {
    return (
        <div>
            <p className="text-3xl text-center font-bold">{data.period}</p>
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
                {data.records.map((r, index) => (
                  <ChartWithRankings key={index} record={r} />
                ))}
            </div>
        </div>
    );
}
