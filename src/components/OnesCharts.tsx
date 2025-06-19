import BarGraph from "@/components/BarGraph";
import LineGraph from "@/components/LineGraph";
import OnesRankings from "@/components/OnesRankings"
import { tOnesPeriodData } from "@/lib/TypeDeclarations";

export default async function OnesCharts({data}: {data: tOnesPeriodData;}) {
    return (
        <div className="space-y-2">
            <p className="text-3xl text-center font-bold">{data.period}</p>
            <div className="grid h-full grid-cols-1 space-y-4 md:grid-cols-2 space-x-4">
                {data.chartsRecords.map((r, index) => (
                    <div key={index}>
                        <p className="text-center text-2xl font-bold">{r.type}</p>
                        <BarGraph key={index} barChartData={r.barChartData} />
                    </div>
                ))}
            </div>
            <div className="grid h-full space-4 grid-cols-1 md:grid-cols-2">
                <LineGraph lineRecord={data.lineRecord} />
                {data.rankingList &&
                    <OnesRankings rankingList={data.rankingList} period={data.period} />
                }
            </div>
        </div>
    );
}