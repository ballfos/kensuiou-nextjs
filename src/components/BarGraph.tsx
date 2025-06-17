'use client'
import { tBarChartConfig, tBarChartData } from "@/components/BarGraphWithRankingTS";

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

export default function BarGraph({barChartConfig, barChartData}: {barChartConfig: tBarChartConfig, barChartData: tBarChartData[]}) {

  const maxValue = Math.max(...barChartData.map((d) => d.counts));

  const CustomImageLabel = (props: any) => {
    const { x, y, width, height, value } = props;

    if (value !== maxValue) return null;

    return (
      <image x={x+(width/2)-48} y={y+(height/2)-48} width={96} height={96} href="choi_king.PNG"/>
    );
  };

  return (
    <Card className="w-full max-w-3xl mx-auto mt-6">
      {/* グラフのヘッダー */}
      {/* <CardHeader> 
        <CardTitle>{rawChartConfig.title}</CardTitle>
      </CardHeader> */}
      {/* グラフ表示領域(すなわちbody)であることを明記するためのラッパー */}
      <CardContent>
        {/* グラフコンポーネント configにグラフの軸ラベルと色情報を渡す */}
        <ChartContainer config={barChartConfig}>
          {/* グラフの種類を決める(BarChartやLineChartなど) */}
          <BarChart data={barChartData}>
            {/* グラフのラベルを決める (chartConfigのラベルキーを設定する) */}
            <XAxis dataKey="name" stroke="#8884d8"
              tick={{fill: "#000000", fontWeight: 600, fontSize: 18}}/>
            <YAxis 
              tick={{fill: "#000000", fontWeight: 600, fontSize: 18}}/>
            <ChartTooltip content={<ChartTooltipContent />} />
            {/* 上のchartConfigのキーをdataKeyに入れる 
                fillに指定するのはchartConfigのカラー属性で、--color-〇〇キーとする */}
            <Bar dataKey="counts" fill="var(--color-counts)" label={<CustomImageLabel />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
