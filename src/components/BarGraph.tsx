"use client";
import { tBarChartConfig, tBarChartData } from "@/lib/TypeDeclarations";

// 懸垂の自己記録を取得できるなら、その合計回数、平均回数、目標達成率、前週比などを含められると良い?
import { BarChart, Bar, XAxis, YAxis, Cell, LabelList } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent } from "@/components/ui/card";

export default function BarGraph({
  barChartData,
}: {
  barChartData: tBarChartData[];
}) {
  const maxValue = Math.max(...barChartData.map((d) => d.counts));

  interface CustomImageLabelProps {
    x: number;
    y: number;
    width: number;
    height: number;
    value: number;
  }
  const CustomImageLabel = (props: CustomImageLabelProps) => {
    const { x, y, width, height, value } = props;

    if (value !== maxValue || maxValue === 0) return null;

    const imageSize = width >= 96 ? 96 : 48;

    return (
      <image
        x={x + width / 2 - imageSize / 2}
        y={y + height / 2 - imageSize / 2}
        width={imageSize}
        height={imageSize}
        href="choi_king.PNG"
      />
    );
  };
  interface CustomTickProps {
    x: number;
    y: number;
    payload: { value: string };
    index: number;
  }
  const CustomTick = (props: CustomTickProps) => {
    const { x, y, payload, index } = props;

    return (
      <text
        x={x}
        y={y + 16}
        textAnchor="middle"
        fontSize={18}
        fontWeight={600}
        style={{
          fill:
            barChartData[index].id === "bf8432fc-f4c3-48ec-8268-bbd26786fea1"
              ? "#ef4444"
              : "#000000",
        }} // 条件に応じて色分け
      >
        {payload.value}
      </text>
    );
  };

  const barChartConfig: tBarChartConfig = {
    counts: {
      color: "#facc15",
    },
  };

  return (
    <Card className="w-full max-w-3xl mx-auto mt-6">
      {/* グラフ表示領域(すなわちbody)であることを明記するためのラッパー */}
      <CardContent>
        {/* グラフコンポーネント configにグラフの軸ラベルと色情報を渡す */}
        <ChartContainer config={barChartConfig}>
          {/* グラフの種類を決める(BarChartやLineChartなど) */}
          <BarChart data={barChartData}>
            {/* グラフのラベルを決める (chartConfigのラベルキーを設定する) */}
            <XAxis
              dataKey="name"
              stroke="#8884d8"
              interval={0}
              tick={CustomTick}
            />
            <YAxis tick={{ fill: "#000000", fontWeight: 600, fontSize: 18 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {/* 上のchartConfigのキーをdataKeyに入れる 
                            fillに指定するのはchartConfigのカラー属性で、--color-〇〇キーとする */}
            <Bar dataKey="counts">
              {barChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.id === "bf8432fc-f4c3-48ec-8268-bbd26786fea1"
                      ? "#ef4444"
                      : "var(--color-counts)"
                  }
                />
              ))}
              <LabelList dataKey="counts" content={CustomImageLabel} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
