// ファイルパス: components/LineGraphs.tsx

// ✅ 新しい LineChartCard をインポート
import LineGraph from "@/components/LineGraph";
import { tLineData } from "@/lib/TypeDeclarations";

export default async function LineGraphs({
  lineData,
}: {
  lineData: tLineData;
}) {
  return (
    <div>
      <p className="text-3xl text-center font-bold mb-6">{lineData.period}</p>
      <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
        {lineData.records.map((r, index) => (
          // ✅ ここで直接 LineChartCard を呼び出す
          <LineGraph key={index} lineRecord={r} />
        ))}
      </div>
    </div>
  );
}
