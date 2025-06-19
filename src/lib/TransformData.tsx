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
  // 補足: rawDataの型は、新しいデータ形式に合わせて更新されたものと仮定します
  rawData: any[],
  shoulder: "Narrow" | "Wide"
): tLineData[] {
  // 全てのメンバーのユニークなニックネームを取得
  const allMembers = [...new Set(rawData.map((d) => d.nickname))];
  const shoulderKey = shoulder.toLowerCase(); // "narrow" または "wide"

  // ▼▼▼ ここから修正 ▼▼▼
  // 処理したいデータの種類を定義
  const typeInfo = [
    { key: "cumulative_max", label: "Max" },
    { key: "cumulative_sum", label: "Sum" },
  ];

  // typeInfoを元に、"Max"と"Sum"の各グラフデータを生成
  const finalRecords: tLineRecord[] = typeInfo.map((type) => {
    const weeklyData = new Map<string, tLineChartData>();
    // "max_narrow_counts" や "sum_narrow_counts" のようなキー名を動的に作成
    const dataKey = `${shoulderKey}_${type.key}_counts`;

    for (const record of rawData) {
      // 対象のデータが存在しない場合はスキップ
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
        weeklyData.set(weekLabel, newPoint);
      }

      const point = weeklyData.get(weekLabel)!;
      // 同じ週に同じメンバーのデータが複数ある場合も考慮して加算
      point[record.nickname] = (point[record.nickname] as number) + value;
    }

    const sortedWeeklyLineData = Array.from(weeklyData.values()).sort(
      (a, b) => {
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
      }
    );

    return {
      type: type.label,
      lineChartData: sortedWeeklyLineData,
    };
  });

  // --- 最終的なデータ構造の組み立て ---
  const result: tLineData[] = [
    {
      period: "Week",
      // データが存在するレコードのみをフィルタリングして格納
      records: finalRecords.filter((r) => r.lineChartData.length > 0),
    },
  ];

  return result;
}
