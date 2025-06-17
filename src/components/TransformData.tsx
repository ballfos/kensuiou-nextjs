import {
  tData,
  RawMemberData,
  tRecord,
} from "@/components/BarGraphWithRankingTS";
import type { ChartConfig } from "@/components/ui/chart";
// rawdataを新しいtData[]形式に変換する関数
// rawdataを新しいtData[]形式に変換する関数
export function transformData(rawData: RawMemberData[]): tData[] {
  const periods = [
    { name: "Day", prefix: "today" },
    { name: "Week", prefix: "this_week" },
    { name: "Total", prefix: "total" },
  ];

  // ✅ gripのループを外側のレベルに移動
  const grips = ["narrow", "wide"];
  const types = ["max", "sum"];

  // ✅ 新しいtDataオブジェクトを格納する配列を準備
  const transformedData: tData[] = [];

  // periodとgripで二重ループを回す
  for (const period of periods) {
    for (const grip of grips) {
      // ✅ このtDataオブジェクトの records 配列を作成する
      // ループは "max", "sum" だけで良い
      const records: tRecord[] = types.map((type) => {
        const dataKey =
          `${period.prefix}_${grip}_${type}_counts` as keyof RawMemberData;

        const chartConfig: ChartConfig = {
          counts: {
            label: "回数",
            color:
              grip === "narrow" ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))",
          },
        };

        const record: tRecord = {
          // ✅ typeは "Max" または "Sum" だけで良い
          type: `${type.charAt(0).toUpperCase() + type.slice(1)}`,

          barChartData: rawData
            .map((member) => ({
              name: member.nickname,
              counts: member[dataKey] as number,
            }))
            .sort((a, b) => b.counts - a.counts),
        };
        return record;
      });

      // ✅ sholder, period, records を持つ新しい tData オブジェクトを作成してプッシュする
      transformedData.push({
        sholder: grip.charAt(0).toUpperCase() + grip.slice(1), // "Narrow" or "Wide"
        period: period.name,
        records: records,
      });
    }
  }

  return transformedData;
}
