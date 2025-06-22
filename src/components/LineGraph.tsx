// ファイルパス: components/LineChartCard.tsx
"use client";

import { tLineRecord } from "@/lib/TypeDeclarations";
import Link from "next/link";

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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// このコンポーネントは "Max" または "Sum" のレコードを一つ受け取ります
export default function LineGraph({lineRecord}: {lineRecord: tLineRecord;}) {

  const { type, lineChartConfig, lineChartData } = lineRecord;
  return (
    <Card className="w-full max-w-6xl mx-auto mt-6">
      <CardHeader>
        {/* カードのタイトルとして"Max"や"Sum"を表示 */}
        <CardTitle className="text-center text-3xl">{type}</CardTitle>
        {/* <CardDescription>週間ごとの最大回数の推移</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={lineChartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              accessibilityLayer
              data={lineChartData}
              margin={{ top: 10, right: 50, left: 10, bottom: 10 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={14} interval={0} />
              <YAxis fontSize={14} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              {Object.entries(lineChartConfig).map(([userID, config]) => (
                <Line
                  key={userID}
                  dataKey={userID}
                  stroke={config.color}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        {/* 凡例をここに表示（独自実装の凡例） */}
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 w-full">
          {Object.entries(lineChartConfig).map(([key, config]) => (
            <li key={key} className="flex items-center text-sm">
              <Link href={`/user/${key}`} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: config.color }}
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
