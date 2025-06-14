'use client'

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

// データのラベルとその値 (nameはラベル、それ以外はそれぞれのグラフの値)
const data = [
  { name: '6/8', counts: 40, mine: 50 },
  { name: '6/9', counts: 35, mine: 49 },
  { name: '6/10', counts: 44, mine: 39 },
  { name: '6/11', counts: 42, mine: 43 },
  { name: '6/12', counts: 50, mine: 44 },
  { name: '6/13', counts: 41, mine: 56 },
  { name: '6/14', counts: 51, mine: 58 },
]

// グラフの軸ラベルと色 (複数設定可能)
const chartConfig = {
  counts: {
    label: '平均',
    color: '#4f46e5',
  },
  mine: {
    label: '自分',
    color: '#ff0000'
  }
}

export default function BarGraph() {
  return (
    <Card className="w-full max-w-3xl mx-auto mt-6">
      {/* グラフのヘッダー */}
      <CardHeader> 
        <CardTitle>1週間の記録(合計)</CardTitle>
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
            <Bar dataKey="counts" fill="var(--color-counts)" />
            <Bar dataKey="mine" fill="var(--color-mine)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
