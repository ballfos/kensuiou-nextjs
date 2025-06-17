'use client';

import { tLineChartConfig, tLineChartData } from '@/lib/TypeDeclarations';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

export default function LineGraphCard({lineChartData}: {lineChartData: tLineChartData[]}) {
    const lineChartConfig: tLineChartConfig = {
        a1234: {
            label: "ゴイゴイスー",
            color: "#facc15"
        },
    };

    return (
      <Card className="w-full max-w-3xl mx-auto mt-6">
        <CardContent>
          <ChartContainer config={lineChartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                {Object.entries(lineChartConfig).map(([userID,]) => (
                    <Line key={userID}
                    type="monotone"
                    dataKey={userID}
                    stroke={`var(--color-${userID})`}
                    strokeWidth={2} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    );
}