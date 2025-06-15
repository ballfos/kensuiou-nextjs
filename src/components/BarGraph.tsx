'use client'
import { tChartData, tChartConfig, tRawChartConfig } from "./ChartWithRankingsTS";

// 懸垂の自己記録を取得できるなら、その合計回数、平均回数、目標達成率、前週比などを含められると良い?
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LegendProps
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function BarGraph({rawChartConfig}: {rawChartConfig: tRawChartConfig}) {

  // chartConfig を作る
  const chartConfig: tChartConfig = Object.fromEntries(
    Object.entries(rawChartConfig.datasets).map(([key, { label, color }]) => [
      key,
      { label, color }
    ])
  )

  // chartData を作る
  const chartData = rawChartConfig.labels.map((label, index) => {
    const entry: tChartData = { name: label }
    for (const [key, { values }] of Object.entries(rawChartConfig.datasets)) {
      entry[key] = values[index]
    }
    return entry
  })

  return (
    <Card className="w-full max-w-3xl mx-auto mt-6">
      {/* グラフのヘッダー */}
      <CardHeader> 
        <CardTitle>{rawChartConfig.title}</CardTitle>
      </CardHeader>
      {/* グラフ表示領域(すなわちbody)であることを明記するためのラッパー */}
      <CardContent>
        {/* グラフコンポーネント configにグラフの軸ラベルと色情報を渡す */}
        <ChartContainer config={chartConfig}>
          {/* グラフの種類を決める(BarChartやLineChartなど) */}
          <BarChart data={chartData}>
            {/* グラフのラベルを決める (chartConfigのラベルキーを設定する) */}
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={(props) => <ChartLegendContent {...props} />} />

            {/* 上のchartConfigのキーをdataKeyに入れる 
                fillに指定するのはchartConfigのカラー属性で、--color-〇〇キーとする */}
            <Bar dataKey="counts" fill="var(--color-counts)" />
            <Bar dataKey="mine" fill="var(--color-mine)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
