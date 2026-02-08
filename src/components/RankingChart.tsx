"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CountData } from "@/lib/data";
// チャートの色の設定
const chartConfig = {
  counts: {
    label: "counts",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function RankingChart({
  countDataList,
}: {
  countDataList: CountData[];
}) {
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart
        accessibilityLayer
        data={countDataList}
        layout="vertical" // 横向きのバーチャートにする
        margin={{
          left: 10,
          right: 40, // LabelListのための余白
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="nickname"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          width={120} // ニックネームの表示領域
          className="text-sm font-black"
        />
        <XAxis
          dataKey="counts"
          type="number"
          tickMargin={10}
          domain={[0, Math.max(...countDataList.map((d) => d.counts)) + 10]}
          hide
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelKey="nickname"
              // ツールチップに順位も表示
              formatter={(value, name, props) => (
                <>
                  <p>Counts: {value}</p>
                  <p>Rank: {props.payload.rank}</p>
                </>
              )}
            />
          }
        />
        <Bar
          dataKey="counts"
          layout="vertical"
          radius={5}
          fill="var(--chart-1)"
        >
          <LabelList
            dataKey="rank"
            content={(props) => {
              const rank = Number(props.value);
              if (rank !== 1) return null;
              const x = Number(props.x);
              const y = Number(props.y);
              const width = Number(props.width);
              const height = Number(props.height);

              return (
                <image
                  x={x + width / 2 - height / 2}
                  y={y - height / 3}
                  height={height * 2}
                  href="/choi_king.png"
                />
              );
            }}
          />
          {/* バーの右側にcountsの値を表示 */}
          <LabelList
            dataKey="counts"
            position="right"
            offset={2}
            className="fill-foreground text-base"
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
