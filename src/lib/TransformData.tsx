import {
  tData,
  RawMemberData,
  tLineData,
  tLineChartData,
  LineRawMemberData,
  tPeriodData,
  tRecord,
  tLineRecord,
  tLineChartConfig,
  tOnesDataByUser,
  tOnesData,
  tBarChartData,
} from "@/lib/TypeDeclarations";

import { schemeTableau10 } from "d3-scale-chromatic";

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

// limitからデータ表示の期間を取得する
function calculateLimit(period: string, limit: number): number {
  switch (period) {
    case 'Day': return limit;
    case 'Week': return limit * 7;
    case 'Month': return limit * 30;
    default: return 3650;
  }
}

export function transformToLineChartData(
  // 補足: rawDataの型は、新しいデータ形式に合わせて更新されたものと仮定します
  rawData: LineRawMemberData[],
  shoulder: "Narrow" | "Wide",
  limit: number,
  period: string,
): tLineData[] {
  // 全てのメンバーのユニークなニックネームを取得
  const allMembers = [...new Set(rawData.map((d) => d.member_id))];
  const shoulderKey = shoulder.toLowerCase(); // "narrow" または "wide"

  // 1. データからメンバーのキー（ニックネーム）を動的に取得
  const memberKeys = rawData.map((r) => ({
    id: r.member_id,
    label: r.nickname,
  }));

  // 2. カラーパレットを定義（参考コードの形式に合わせる）
  const colorPalette = schemeTableau10;

  // 3. メンバー情報をもとに、chartConfigを動的に生成
  const lineChartConfig = memberKeys.reduce((config, memberKey, index) => {
    config[memberKey.id] = {
      label: memberKey.label,
      // 参考コードに合わせてCSS変数を直接割り当てる
      color: colorPalette[index % colorPalette.length],
    };
    return config;
  }, {} as tLineChartConfig);

  // ▼▼▼ ここから修正 ▼▼▼
  // 処理したいデータの種類を定義
  const typeInfo = [
    { key: "max", label: "Max" },
    { key: "cumulative_max", label: "Cumulative Max" },
    { key: "cumulative_sum", label: "Cumulative Sum" },
  ];

  const now = new Date();
  const limitRange = new Date();
  limitRange.setDate(now.getDate() - calculateLimit(period, limit));

  // typeInfoを元に、"Max"と"Sum"の各グラフデータを生成
  const finalRecords: tLineRecord[] = typeInfo.map((type) => {
    const weeklyData = new Map<string, { data: tLineChartData; date: Date }>();
    // "max_narrow_counts" や "sum_narrow_counts" のようなキー名を動的に作成
    const dataKey = `${shoulderKey}_${type.key}_counts`;

    // データベースのデータを順にweeklyDataに格納していく
    for (const record of rawData) {
      // 対象のデータが存在しない場合はスキップ
      if (record[dataKey] === undefined) continue;

      // 日付を取得する
      const weekStart = new Date(record.week_start_date);

      if (weekStart <= limitRange) continue;

      const weekEnd = new Date(weekStart);
      // ここは今日の日付にするか週末の日付にするか、どちらが良いかを考える
      weekEnd.setDate(weekStart.getDate() + 6);
      const weekLabel = `${formatDate(weekStart)}~${formatDate(weekEnd)}`;

      if (!weeklyData.has(weekLabel)) {
        const newPoint: tLineChartData = { name: weekLabel };
        // 後述の重複対策用に0を初期値として設定する。
        allMembers.forEach((member) => {
          newPoint[member] = 0;
        });
        weeklyData.set(weekLabel, { data: newPoint, date: weekStart });
      }

      const point = weeklyData.get(weekLabel)!.data;

      // 同じ週に同じメンバーのデータが複数ある場合も考慮して加算 (特定のメンバーの特定の日のデータが重複している場合)
      point[record.member_id] =
        (point[record.member_id] as number) + Number(record[dataKey]);
    }

    // ▼▼▼ ソート処理を修正しました ▼▼▼
    const sortedWeeklyLineData = Array.from(weeklyData.values())
      // 保存した date を使って正しくソートします
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      // ソート後にグラフ用のデータ(data)だけを抽出します
      .map((item) => item.data);

    return {
      type: type.label,
      lineChartConfig: lineChartConfig,
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

export const transformLineDataToOnesData = (
  rawData: LineRawMemberData[],
  limit: number,
  period: string,
): tOnesDataByUser[] => {
  // 1. 全ユーザーの色設定 (変更なし)
  const allUsers = Array.from(
    new Map(
      rawData.map((d) => [
        d.member_id,
        { id: d.member_id, nickname: d.nickname },
      ])
    ).values()
  );
  const colorPalette = schemeTableau10;
  const userColorMap = new Map<string, string>();
  allUsers.forEach((user, index) => {
    userColorMap.set(user.id, colorPalette[index % colorPalette.length]);
  });

  // 2. ユーザーごとのデータグループ化 (変更なし)
  const dataByUser = new Map<string, LineRawMemberData[]>();
  for (const record of rawData) {
    if (!dataByUser.has(record.member_id)) {
      dataByUser.set(record.member_id, []);
    }
    dataByUser.get(record.member_id)!.push(record);
  }

  const result: tOnesDataByUser[] = [];

  // 3. ユーザーごとにループ

  const now = new Date();
  const limitRange = new Date();
  limitRange.setDate(now.getDate() - calculateLimit(period, limit));

  for (const [userId, userRecords] of dataByUser.entries()) {
    const nickname = userRecords[0]?.nickname || "Unknown";
    const userColor = userColorMap.get(userId) || "#888888";

    const onesData: tOnesData[] = [];
    for (const shoulderType of ["Narrow", "Wide"] as const) {
      const lowerShoulderType = shoulderType.toLowerCase() as "narrow" | "wide";

      const dayChartsRecords: tRecord[] = [];
      const dayLineRecords: tLineRecord[] = [];
      const weekChartsRecords: tRecord[] = [];
      const weekLineRecords: tLineRecord[] = [];

      if (userRecords.length > 0) {
        const sortedUserRecords = [...userRecords].sort(
          (a, b) =>
            new Date(a.week_start_date).getTime() -
            new Date(b.week_start_date).getTime()
        );

        // 棒グラフ①: 週ごとの最大回数（個人の推移） (変更なし)
        const weeklyMaxCountsData: tBarChartData[] = sortedUserRecords
          .filter((record) => new Date(record.week_start_date) >= limitRange)
          .map((record) => {
            const startDate = new Date(record.week_start_date);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6); // 週の終わり = 開始 + 6日

            const name = `${startDate.getMonth() + 1}/${startDate.getDate()}~${endDate.getMonth() + 1}/${endDate.getDate()}`;

            return {
              id: record.week_start_date,
              name,
              counts: Number(
                lowerShoulderType === "narrow"
                  ? record.narrow_max_counts
                  : record.wide_max_counts
              ),
            };
          });

        // 棒グラフ②: 週ごとの合計回数（個人の推移） (変更なし)
        const weeklySumCountsData: tBarChartData[] = sortedUserRecords
          .filter((record) => new Date(record.week_start_date) >= limitRange)
          .map((record) => {
            const startDate = new Date(record.week_start_date);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);

            const name = `${startDate.getMonth() + 1}/${startDate.getDate()}~${endDate.getMonth() + 1}/${endDate.getDate()}`;

            return {
              id: record.week_start_date,
              name,
              counts: Number(
                lowerShoulderType === "narrow"
                  ? record.narrow_sum_counts
                  : record.wide_sum_counts
              ),
            };
          });


        weekChartsRecords.push({
          type: "Max",
          barChartData: weeklyMaxCountsData,
        });
        weekChartsRecords.push({
          type: "Sum",
          barChartData: weeklySumCountsData,
        });

        // --- ▼▼▼ ここからが修正箇所 ▼▼▼ ---

        // 折れ線グラフ: 累計回数
        const weeklyCumulativeData = sortedUserRecords
          .filter((d) => new Date(d.week_start_date) >= limitRange)
          .map((d) => {
            const startDate = new Date(d.week_start_date);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);

            const name = `${startDate.getMonth() + 1}/${startDate.getDate()}~${endDate.getMonth() + 1}/${endDate.getDate()}`;

            return {
              name,
              [userId]: Number(
                lowerShoulderType === "narrow"
                  ? d.narrow_cumulative_sum_counts
                  : d.wide_cumulative_sum_counts
              ),
            };
          });

        // 折れ線グラフ: 連続回数
        const weeklyMaxConsecutiveData = sortedUserRecords
          .filter((d) => new Date(d.week_start_date) >= limitRange)
          .map((d) => {
            const startDate = new Date(d.week_start_date);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);

            const name = `${startDate.getMonth() + 1}/${startDate.getDate()}~${endDate.getMonth() + 1}/${endDate.getDate()}`;

            return {
              name,
              [userId]: Number(
                lowerShoulderType === "narrow"
                  ? d.narrow_cumulative_max_counts
                  : d.wide_cumulative_max_counts
              ),
            };
          });

        // --- ▲▲▲ ここまでが修正箇所 ▲▲▲ ---

        weekLineRecords.push({
          type: "Cumulative Total",
          lineChartConfig: { [userId]: { label: nickname, color: userColor } },
          lineChartData: weeklyCumulativeData,
        });
        weekLineRecords.push({
          type: "Best in Max",
          lineChartConfig: { [userId]: { label: nickname, color: userColor } },
          lineChartData: weeklyMaxConsecutiveData,
        });
      }

      onesData.push({
        shoulder: shoulderType,
        periods: [
          {
            period: "Day",
            chartsRecords: dayChartsRecords,
            lineRecord: dayLineRecords,
          },
          {
            period: "Week",
            chartsRecords: weekChartsRecords,
            lineRecord: weekLineRecords,
          },
        ],
      });
    }

    result.push({ id: userId, name: nickname, onesData });
  }

  return result;
};
