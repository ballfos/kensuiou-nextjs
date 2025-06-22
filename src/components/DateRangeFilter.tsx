"use client"

import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function DateRangeFilter({page, limit, shoulder, period, id}: {page: string; limit: string; shoulder: string; period: string; id?: string}) {
    const router = useRouter();
    const [crntLimit, setCrntLimit] = useState<string>(limit);

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

    const handleChange = (val: string) => {
        // 空文字は許可
        if (val === "") {
            setCrntLimit(val)
            return
        }

        // 数字のみ許可(001などは無効)
        if (/^[1-9][0-9]*$/.test(val)) {
            setCrntLimit(val)
        }
        // それ以外の入力は無視
    }

    const limitOnClick = () => {
        const limitNumber = Number(crntLimit);

        if (["Day", "Week", "Month", "Total"].includes(period) && limitNumber >= periodMinAndMax[0] && limitNumber <= periodMinAndMax[1]) {
            router.push(
            `${page}?shoulder=${shoulder}&period=${period}&id=${id || ""}&limit=${crntLimit}`
            )
        }
  }

  return (
    <div className="flex items-center w-fit space-x-2">
        <Input
            type="text"
            min={periodMinAndMax[0]}
            max={periodMinAndMax[1]}
            value={crntLimit}
            onChange={(e) => handleChange(e.target.value)}
            className="w-16 h-12 border-yellow-600 text-yellow-600 !text-3xl text-center
            [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <p className="text-yellow-600 text-3xl">{`${periodLabel}`}分のデータを</p>
        <Button onClick={limitOnClick} className="bg-yellow-600 text-2xl p-6 border-yellow-600 border-2 hover:text-yellow-600 hover:bg-white">表示</Button>
    </div>
  )
}
