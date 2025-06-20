import BarGraph from "@/components/BarGraph";
import LineGraph from "@/components/LineGraph";
// import OnesRankings from "@/components/OnesRankings"
import { tOnesPeriodData } from "@/lib/TypeDeclarations";

export default async function OnesCharts({ data }: { data: tOnesPeriodData }) {
  return (
    <div className="space-y-2">
      <div className="grid h-full gap-6 grid-cols-1 space-y-4 md:grid-cols-2">
        {data.chartsRecords.map((r, index) => (
          <div key={index}>
            <p className="text-center text-2xl font-bold">{r.type}</p>
            <BarGraph key={index} barChartData={r.barChartData} />
          </div>
        ))}
      </div>
      <div className="grid h-full gap-6 grid-cols-1 md:grid-cols-2">
        {data.lineRecord.map((lr, lrIndex) => (
          <LineGraph key={lrIndex} lineRecord={lr} />
        ))}
        {/* ランキングは今は表示しない。代わりに連続回数の遷移の折れ線グラフを表示させる。*/}
        {/* {data.rankingList &&
                    <OnesRankings rankingList={data.rankingList} period={data.period} />
                } */}
      </div>
    </div>
  );
}
