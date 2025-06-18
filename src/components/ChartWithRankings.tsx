import ChartWithRanking from "@/components/ChartWithRanking";
import { tPeriodData } from "@/lib/TypeDeclarations";

export default async function ChartWithRankings({
  data,
}: {
  data: tPeriodData;
}) {
  return (
    <div>
      {/* <p className="text-3xl text-center font-bold">{data.period}</p> */}
      <div className="grid h-full grid-cols-1 space-y-4 md:grid-cols-2 md: space-x-4">
        {data.records.map((r, index) => (
          <ChartWithRanking key={index} record={r} />
        ))}
      </div>
    </div>
  );
}
