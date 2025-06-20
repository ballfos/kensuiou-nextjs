"use client"

import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function DateRangeFilter({limit, shoulder, period, id}: {limit: string; shoulder: string; period: string; id: string}) {
    const router = useRouter();
    const [crntLimit, setCrntLimit] = useState<number>(Number(limit));

    const periodMinAndMax: [number, number] =  (() => {
        switch (period) {
            case 'Day':
                return [1, 50];
            case 'Week':
                return [1, 52];
            case 'Month':
                return [1, 48];
            default:
                return [1, 50];
        }
    })();

    const periodLabel: string =  (() => {
        switch (period) {
            case 'Day':
                return "日";
            case 'Week':
                return "週";
            case 'Month':
                return "月";
            default:
                return "年";
        }
    })();

    const limitOnClick = () => {
      if (["Day", "Week", "Month", "Total"].includes(period) && crntLimit >= periodMinAndMax[0] && crntLimit <= periodMinAndMax[1]) {
        router.push(
          `/members?shoulder=${shoulder}&period=${period}&id=${id}&limit=${crntLimit}`
        )
      }
  }

  return (
    <div className="flex items-center w-fit space-x-2">
        <Input
            type="number"
            min={periodMinAndMax[0]}
            max={periodMinAndMax[1]}
            value={crntLimit}
            onChange={(e) => setCrntLimit(Number(e.target.value))}
            className="w-16 h-12 border-yellow-600 text-yellow-600 !text-3xl
            [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <p className="text-yellow-600 text-3xl">{`${periodLabel}`}前までデータを</p>
        <Button onClick={limitOnClick} className="bg-yellow-600 text-2xl p-6">表示!!</Button>
    </div>
  )
}
