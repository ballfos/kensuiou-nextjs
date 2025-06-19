// ファイルパス: components/LineChartCard.tsx
"use client";

import { tLineRecord, tLineChartConfig } from "@/lib/TypeDeclarations";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { schemeTableau10 } from "d3-scale-chromatic";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// このコンポーネントは "Max" または "Sum" のレコードを一つ受け取ります
export default function LineGraph({ lineRecord }: { lineRecord: tLineRecord }) {
  // 1. データからメンバーのキー（ニックネーム）を動的に取得
  const memberKeys =
    lineRecord.lineChartData.length > 0
      ? Object.keys(lineRecord.lineChartData[0]).filter((key) => key !== "name")
      : [];

  // 2. カラーパレットを定義（参考コードの形式に合わせる）
  const colorPalette = schemeTableau10;

  // 3. メンバー情報をもとに、chartConfigを動的に生成
  const chartConfig = memberKeys.reduce((config, memberKey, index) => {
    config[memberKey] = {
      label: memberKey,
      // 参考コードに合わせてCSS変数を直接割り当てる
      color: colorPalette[index % colorPalette.length],
    };
    return config;
    // ここはtChartConfigにするべきか?
  }, {} as ChartConfig); // shadcn/uiのChartConfig型を使用

  return (
    <Card className="w-full max-w-3xl mx-auto mt-6">
      <CardHeader>
        {/* カードのタイトルとして"Max"や"Sum"を表示 */}
        <CardTitle>推移グラフ - {lineRecord.type}</CardTitle>
        <CardDescription>週間ごとの最大回数の推移</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              accessibilityLayer
              data={lineRecord.lineChartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              {Object.entries(chartConfig).map(([userID]) => (
                <Line
                  key={userID}
                  dataKey={userID}
                  stroke={`var(--color-${userID})`}
                  strokeWidth={2}
                  dot={false} // 点も表示するように変更
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        {/* 凡例をここに表示（独自実装の凡例） */}
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 w-full">
          {Object.entries(chartConfig).map(([key, config]) => (
            <li key={key} className="flex items-center text-sm">
              <Link href={`/user/${key}`} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: `var(${config.color})` }}
                ></span>
                <span className="font-medium">{config.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
}
