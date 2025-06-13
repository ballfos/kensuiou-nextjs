'use client'

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

// データのラベルとその値 (nameはラベル、それ以外はそれぞれのグラフの値)
const data = [
  { name: 'Jan', sales: 400, lastyear: 300 },
  { name: 'Feb', sales: 300, lastyear: 500 },
  { name: 'Mar', sales: 500, lastyear: 400 },
  { name: 'Apr', sales: 200, lastyear: 400 },
]

// グラフの軸ラベルと色 (複数設定可能)
const chartConfig = {
  sales: {
    label: '売上',
    color: '#4f46e5', // Indigo-600
  },
  lastyear: {
    label: '前年',
    color: '#10b981',
  }
}

export default function BarSample() {
  return (
    <Card className="w-full max-w-3xl mx-auto mt-6">
      {/* グラフのヘッダー */}
      <CardHeader> 
        <CardTitle>月別売上</CardTitle>
      </CardHeader>
      {/* グラフ表示領域(すなわちbody)であることを明記するためのラッパー */}
      <CardContent>
        {/* グラフコンポーネント configにグラフの軸ラベルと色情報を渡す */}
        <ChartContainer config={chartConfig}>
          {/* グラフの種類を決める(BarChartやLineChartなど) */}
          <BarChart data={data}>
            {/* グラフのラベルを決める (chartConfigのラベルキーを設定する) */}
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={(props: LegendProps) => <ChartLegendContent {...props} />} />
            {/* 上のchartConfigのキーをdataKeyに入れる 
                fillに指定するのはchartConfigのカラー属性で、--color-〇〇キーとする */}
            <Bar dataKey="sales" fill="var(--color-sales)" />
            <Bar dataKey="lastyear" fill="var(--color-lastyear)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
