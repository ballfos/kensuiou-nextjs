import { tData } from "@/components/ChartWithRankingsTS";

export async function GET(req: Request) {
  // ここで外部のデータベースに接続してデータを取得する
  const data: tData[] = [
    {
      rawChartConfig: {
        title: "1日の記録(合計)",
        datasets: {
          counts: {
            label: "平均",
            color: "#4f46e5",
            values: [40, 35, 44, 42, 50, 41, 51],
          },
          mine: {
            label: "自分",
            color: "#ff0000",
            values: [50, 49, 39, 43, 44, 56, 58],
          },
        },
        labels: ["6/8", "6/9", "6/10", "6/11", "6/12", "6/13", "6/14"],
      },
      rankings: [
        {
          kind: "合計回数ランキング",
          content: [
            {
              name: "マッチョ君",
              counts: 105,
              time: "6/12",
            },
            {
              name: "ケン・スイ",
              counts: 103,
              time: "6/14",
            },
            {
              name: "富士狩",
              counts: 102,
              time: "6/11",
            },
          ],
        },
        {
          kind: "最大連続回数",
          content: [
            {
              name: "珍亞歩",
              counts: 32,
              time: "6/10",
            },
            {
              name: "ケン・スイ",
              counts: 27,
              time: "6/11",
            },
            {
              name: "マッチョ君",
              counts: 25,
              time: "6/12",
            },
          ],
        },
      ],
    },
    {
      rawChartConfig: {
        title: "1週間の記録(合計)",
        datasets: {
          counts: {
            label: "平均",
            color: "#4f46e5",
            values: [303, 295, 306, 300],
          },
          mine: {
            label: "自分",
            color: "#ff0000",
            values: [330, 320, 301, 298],
          },
        },
        labels: ["5/18~5/24", "5/25~5/31", "6/1~6/7", "6/8~6/14"],
      },
      rankings: [
        {
          kind: "合計回数ランキング",
          content: [
            {
              name: "マッチョ君",
              counts: 430,
              time: "6/1~6/7",
            },
            {
              name: "ケン・スイ",
              counts: 403,
              time: "6/8~6/14",
            },
            {
              name: "たいし",
              counts: 395,
              time: "5/25~5/31",
            },
            {
              name: "豪傑",
              counts: 384,
              time: "5/18~5/24",
            },
            {
              name: "マッチョ君",
              counts: 378,
              time: "6/1~5/7",
            },
          ],
        },
        {
          kind: "最大連続回数",
          content: [
            {
              name: "マッチョ君",
              counts: 38,
              time: "6/1~6/7",
            },
            {
              name: "珍亞歩",
              counts: 32,
              time: "6/8~6/14",
            },
            {
              name: "ケン・スイ",
              counts: 27,
              time: "6/8~6/14",
            },
            {
              name: "ケン・スイ",
              counts: 27,
              time: "6/8~6/14",
            },
            {
              name: "マッチョ君",
              counts: 25,
              time: "6/8~6/14",
            },
          ],
        },
      ],
    },
    {
      rawChartConfig: {
        title: "1日の記録(合計)",
        datasets: {
          counts: {
            label: "平均",
            color: "#4f46e5",
            values: [40, 35, 44, 42, 50, 41, 51],
          },
          mine: {
            label: "自分",
            color: "#ff0000",
            values: [50, 49, 39, 43, 44, 56, 58],
          },
        },
        labels: ["6/8", "6/9", "6/10", "6/11", "6/12", "6/13", "6/14"],
      },
      rankings: [
        {
          kind: "合計回数ランキング",
          content: [
            {
              name: "マッチョ君",
              counts: 105,
              time: "6/12",
            },
            {
              name: "ケン・スイ",
              counts: 103,
              time: "6/14",
            },
            {
              name: "富士狩",
              counts: 102,
              time: "6/11",
            },
          ],
        },
        {
          kind: "最大連続回数",
          content: [
            {
              name: "珍亞歩",
              counts: 32,
              time: "6/10",
            },
            {
              name: "ケン・スイ",
              counts: 27,
              time: "6/11",
            },
            {
              name: "マッチョ君",
              counts: 25,
              time: "6/12",
            },
          ],
        },
      ],
    },
    {
      rawChartConfig: {
        title: "1日の記録(合計)",
        datasets: {
          counts: {
            label: "平均",
            color: "#4f46e5",
            values: [40, 35, 44, 42, 50, 41, 51],
          },
          mine: {
            label: "自分",
            color: "#ff0000",
            values: [50, 49, 39, 43, 44, 56, 58],
          },
        },
        labels: ["6/8", "6/9", "6/10", "6/11", "6/12", "6/13", "6/14"],
      },
      rankings: [
        {
          kind: "合計回数ランキング",
          content: [
            {
              name: "マッチョ君",
              counts: 105,
              time: "6/12",
            },
            {
              name: "ケン・スイ",
              counts: 103,
              time: "6/14",
            },
            {
              name: "富士狩",
              counts: 102,
              time: "6/11",
            },
          ],
        },
        {
          kind: "最大連続回数",
          content: [
            {
              name: "珍亞歩",
              counts: 32,
              time: "6/10",
            },
            {
              name: "ケン・スイ",
              counts: 27,
              time: "6/11",
            },
            {
              name: "マッチョ君",
              counts: 25,
              time: "6/12",
            },
          ],
        },
      ],
    },
    {
      rawChartConfig: {
        title: "1日の記録(合計)",
        datasets: {
          counts: {
            label: "平均",
            color: "#4f46e5",
            values: [40, 35, 44, 42, 50, 41, 51],
          },
          mine: {
            label: "自分",
            color: "#ff0000",
            values: [50, 49, 39, 43, 44, 56, 58],
          },
        },
        labels: ["6/8", "6/9", "6/10", "6/11", "6/12", "6/13", "6/14"],
      },
      rankings: [
        {
          kind: "合計回数ランキング",
          content: [
            {
              name: "マッチョ君",
              counts: 105,
              time: "6/12",
            },
            {
              name: "ケン・スイ",
              counts: 103,
              time: "6/14",
            },
            {
              name: "富士狩",
              counts: 102,
              time: "6/11",
            },
          ],
        },
        {
          kind: "最大連続回数",
          content: [
            {
              name: "珍亞歩",
              counts: 32,
              time: "6/10",
            },
            {
              name: "ケン・スイ",
              counts: 27,
              time: "6/11",
            },
            {
              name: "マッチョ君",
              counts: 25,
              time: "6/12",
            },
          ],
        },
      ],
    },
    {
      rawChartConfig: {
        title: "1日の記録(合計)",
        datasets: {
          counts: {
            label: "平均",
            color: "#4f46e5",
            values: [40, 35, 44, 42, 50, 41, 51],
          },
          mine: {
            label: "自分",
            color: "#ff0000",
            values: [50, 49, 39, 43, 44, 56, 58],
          },
        },
        labels: ["6/8", "6/9", "6/10", "6/11", "6/12", "6/13", "6/14"],
      },
      rankings: [
        {
          kind: "合計回数ランキング",
          content: [
            {
              name: "マッチョ君",
              counts: 105,
              time: "6/12",
            },
            {
              name: "ケン・スイ",
              counts: 103,
              time: "6/14",
            },
            {
              name: "富士狩",
              counts: 102,
              time: "6/11",
            },
          ],
        },
        {
          kind: "最大連続回数",
          content: [
            {
              name: "珍亞歩",
              counts: 32,
              time: "6/10",
            },
            {
              name: "ケン・スイ",
              counts: 27,
              time: "6/11",
            },
            {
              name: "マッチョ君",
              counts: 25,
              time: "6/12",
            },
          ],
        },
      ],
    },
  ];

  try {
    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify("Error fetching genres"), {
      status: 500,
    });
  }
}
