'use client';

import { tLineChartConfig, tLineChartData } from '@/lib/TypeDeclarations';
import Link from "next/link";

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
  ChartTooltipContent,
  ChartLegend
} from "@/components/ui/chart";

export default function LineGraphCard({lineChartData}: {lineChartData: tLineChartData[]}) {
    const lineChartConfig: tLineChartConfig = {
        a1234: {
            label: "ゴイゴイスー",
            color: "#facc15"
        },
    };

    const ChartLegendContent = () => {
        return (
            <ul className="flex flex-wrap justify-center gap-4 mt-4">
                {Object.entries(lineChartConfig).map(([key, lc]) => (
                    <li key={key}>
                        <Link href={`/user/${key}`} className="flex items-center space-x-1">
                            <p className="w-3 h-3 rounded" style={{ backgroundColor: lc.color }}></p>
                            <span className="cursor-pointer font-bold" style={{ color: lc.color }}>
                            {lc.label}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        );
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
                <ChartLegend content={<ChartLegendContent />} />
                {Object.entries(lineChartConfig).map(([userID,]) => (
                    <Line key={userID}
                    type="linear"
                    dataKey={userID}
                    stroke={`var(--color-${userID})`}
                    strokeWidth={2}
                    />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    );
}