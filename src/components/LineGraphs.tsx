// ファイルパス: components/LineGraphs.tsx

import LineGraph from "@/components/LineGraph";
import { tLineData } from "@/lib/TypeDeclarations";

export default async function LineGraphs({
  lineData,
}: {
  lineData: tLineData;
}) {
  return (
    <div>
      {/* <p className="text-3xl text-center font-bold mb-6">{lineData.period}</p> */}
      <div className="grid h-full grid-cols-1 gap-6 ">
        {lineData.records.map((r, index) => (
          <LineGraph key={index} lineRecord={r} />
        ))}
      </div>
    </div>
  );
}
