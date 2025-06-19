import {
  tData,
  RawMemberData,
  LineRawMemberData,
  tLineData,
  tLineChartData,
  tPeriodData,
  tRecord,
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
  rawData: LineRawMemberData[],
  shoulder: "Narrow" | "Wide"
): tLineData[] {
  // 全てのメンバーのユニークなニックネームを取得
  const allMembers = [...new Set(rawData.map((d) => d.nickname))];

  // --- 週次 (Week) データの生成 ---
  const weeklyData = new Map<string, tLineChartData>();

  for (const record of rawData) {
    const weekStart = new Date(record.week_start_date);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const weekLabel = `${formatDate(weekStart)}~${formatDate(weekEnd)}`;

    const value =
      shoulder === "Narrow" ? record.max_narrow_counts : record.max_wide_counts;

    if (!weeklyData.has(weekLabel)) {
      // 新しい週のデータポイントを作成し、全メンバーを0で初期化
      const newPoint: tLineChartData = { name: weekLabel };
      allMembers.forEach((member) => {
        newPoint[member] = 0;
      });
      weeklyData.set(weekLabel, newPoint);
    }

    // 該当メンバーの値を更新
    const point = weeklyData.get(weekLabel)!;
    // 同じ週に同じメンバーのデータが複数ある場合も考慮して加算
    point[record.nickname] = (point[record.nickname] as number) + value;
  }

  // Mapから配列に変換し、週の開始日でソート
  const sortedWeeklyLineData = Array.from(weeklyData.values()).sort((a, b) => {
    // "6/8~6/14" の "6/8" の部分をパースして比較
    const dateA = new Date(
      new Date().getFullYear(),
      parseInt(a.name.split("~")[0].split("/")[0]) - 1,
      parseInt(a.name.split("~")[0].split("/")[1])
    );
    const dateB = new Date(
      new Date().getFullYear(),
      parseInt(b.name.split("~")[0].split("/")[0]) - 1,
      parseInt(b.name.split("~")[0].split("/")[1])
    );
    return dateA.getTime() - dateB.getTime();
  });

  // --- 最終的なデータ構造の組み立て ---
  const result: tLineData[] = [
    {
      period: "Week",
      records: [
        { type: "Max", lineChartData: sortedWeeklyLineData },
        // 注意: 元データに合計値がないため、Sumは空配列になります
        { type: "Sum", lineChartData: [] },
      ],
    },
  ];

  // 週次データのみを格納した配列を返す
  return result;
}
