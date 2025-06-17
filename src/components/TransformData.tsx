import type { ChartConfig } from "@/components/ui/chart";
import {
  tData,
  RawMemberData,
  tPeriodData,
  tRecord,
} from "@/components/BarGraphWithRankingTS";

export function transformData(rawData: RawMemberData[]): tData[] {
  const periodInfo = [
    { name: "Day", prefix: "today" },
    { name: "Week", prefix: "this_week" },
    { name: "Total", prefix: "total" },
  ];

  const gripInfo = ["narrow", "wide"];
  const typeInfo = ["max", "sum"];

  // ✅ 外側のループをgrip("narrow", "wide")にする
  const transformedData: tData[] = gripInfo.map((grip) => {
    // ✅ 内側のループでperiods配列を作成する
    const periods: tPeriodData[] = periodInfo.map((period) => {
      const records: tRecord[] = typeInfo.map((type) => {
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

      // periodごとのオブジェクトを返す
      return {
        period: period.name,
        records: records,
      };
    });

    // ✅ sholderを最上位に持つオブジェクトを返す
    return {
      sholder: grip.charAt(0).toUpperCase() + grip.slice(1),
      periods: periods,
    };
  });

  return transformedData;
}
