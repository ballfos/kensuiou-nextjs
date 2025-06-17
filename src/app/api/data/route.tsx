import { tData } from "@/components/BarGraphWithRankingTS";

export async function GET(req: Request) {
  // ここで外部のデータベースに接続してデータを取得する
  const data: tData[] = [
    {
      period: "Day",
      records: [
        {
          type: "合計",
          barChartConfig: {
            counts: {
              color: "#facc15"
            },
          },
          barChartData: [
            {name: "力 餅", counts: 50},
            {name: "犬 水", counts: 48},
            {name: "腕 太", counts: 44},
          ],
        },
        {
          type: "最大回数",
          barChartConfig: {
            counts: {
              color: "#facc15"
            },
          },
          barChartData: [
            {name: "犬 水", counts: 22},
            {name: "力 餅", counts: 20},
            {name: "後 李羅", counts: 19},
          ],
        },
      ],
    },
    {
      period: "Week",
      records: [
        {
          type: "合計",
          barChartConfig: {
            counts: {
              color: "#facc15"
            },
          },
          barChartData: [
            {name: "強 我凄", counts: 320},
            {name: "珍 亞布", counts: 310},
            {name: "腕 太", counts: 298},
          ],
        },
        {
          type: "最大回数",
          barChartConfig: {
            counts: {
              color: "#facc15"
            },
          },
          barChartData: [
            {name: "強 我凄", counts: 28},
            {name: "大豪院 邪鬼", counts: 20},
            {name: "魔金李", counts: 19},
          ],
        },
      ],
    },
    {
      period: "Month",
      records: [
        {
          type: "合計",
          barChartConfig: {
            counts: {
              color: "#facc15"
            },
          },
          barChartData: [
            {name: "我 強凄", counts: 1279},
            {name: "急現 御免", counts: 1180},
            {name: "万年 三位", counts: 1158},
          ],
        },
        {
          type: "最大回数",
          barChartConfig: {
            counts: {
              color: "#facc15"
            },
          },
          barChartData: [
            {name: "連 強", counts: 40},
            {name: "後 少C", counts: 33},
            {name: "万年 三位", counts: 30},
          ],
        },
      ],
    },
    {
      period: "Total",
      records: [
        {
          type: "合計",
          barChartConfig: {
            counts: {
              color: "#facc15"
            },
          },
          barChartData: [
            {name: "最強⭐︎最強", counts: 2520},
            {name: "珍 亞布", counts: 2473},
            {name: "万年 三位", counts: 2398},
          ],
        },
        {
          type: "最大回数",
          barChartConfig: {
            counts: {
              color: "#facc15"
            },
          },
          barChartData: [
            {name: "連 強", counts: 40},
            {name: "万年 二位", counts: 39},
            {name: "母母母ー母・母ー母母", counts: 35},
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
