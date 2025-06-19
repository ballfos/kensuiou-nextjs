import {
  tData,
  RawMemberData,
  LineRawMemberData,
  tLineData,
  tLineChartData,
  tPeriodData,
  tRecord,
  tLineRecord,
} from "@/lib/TypeDeclarations";

export function transformData(rawData: RawMemberData[]): tData[] {
  const periodInfo = [
    { name: "Day", prefix: "today" },
    { name: "Week", prefix: "this_week" },
    { name: "Total", prefix: "total" },
  ];

  const shoulderInfo = ["narrow", "wide"];
  const typeInfo = ["max", "sum"];

  // ✅ 外側のループをgrip("narrow", "wide")にする
  const transformedData: tData[] = shoulderInfo.map((grip) => {
    // ✅ 内側のループでperiods配列を作成する
    const periods: tPeriodData[] = periodInfo.map((period) => {
      const records: tRecord[] = typeInfo.map((type) => {
        const dataKey =
          `${period.prefix}_${grip}_${type}_counts` as keyof RawMemberData;

        const record: tRecord = {
          type: `${type.charAt(0).toUpperCase() + type.slice(1)}`,

          barChartData: rawData
            .map((member) => ({
              id: member.member_id,
              name: member.nickname,
              counts: Number(member[dataKey]),
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
      shoulder: grip.charAt(0).toUpperCase() + grip.slice(1),
      periods: periods,
    };
  });

  return transformedData;
}

// ユーティリティ関数（日付フォーマット用）
function formatDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
}

export function transformToLineChartData(
  rawData: any[],
  shoulder: "Narrow" | "Wide"
): tLineData[] {
  const allMembers = [...new Set(rawData.map((d) => d.nickname))];
  const shoulderKey = shoulder.toLowerCase();

  const typeInfo = [
    { key: "max", label: "Max" },

    { key: "cumulative_sum", label: "Cumulative Sum" },
  ];

  const finalRecords: tLineRecord[] = typeInfo.map((type) => {
    // ▼▼▼ Mapの構造を変更し、ソート用の日付も保持するようにします ▼▼▼
    const weeklyData = new Map<string, { data: tLineChartData; date: Date }>();
    const dataKey = `${shoulderKey}_${type.key}_counts`;

    for (const record of rawData) {
      if (record[dataKey] === undefined) continue;

      const weekStart = new Date(record.week_start_date);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      const weekLabel = `${formatDate(weekStart)}~${formatDate(weekEnd)}`;

      const value = Number(record[dataKey]);

      if (!weeklyData.has(weekLabel)) {
        const newPoint: tLineChartData = { name: weekLabel };
        allMembers.forEach((member) => {
          newPoint[member] = 0;
        });
        // ソート用の日付(weekStart)も一緒に保存します
        weeklyData.set(weekLabel, { data: newPoint, date: weekStart });
      }

      const point = weeklyData.get(weekLabel)!.data;
      point[record.nickname] = (point[record.nickname] as number) + value;
    }

    // ▼▼▼ ソート処理を修正しました ▼▼▼
    const sortedWeeklyLineData = Array.from(weeklyData.values())
      // 保存した date を使って正しくソートします
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      // ソート後にグラフ用のデータ(data)だけを抽出します
      .map((item) => item.data);

    return {
      type: type.label,
      lineChartData: sortedWeeklyLineData,
    };
  });

  const result: tLineData[] = [
    {
      period: "Week",
      records: finalRecords.filter((r) => r.lineChartData.length > 0),
    },
  ];

  return result;
}
