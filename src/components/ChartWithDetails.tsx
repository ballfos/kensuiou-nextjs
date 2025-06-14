'use client';

import BarGraph from '@/components/BarGraph';
import Details from '@/components/Details';
import { useState } from 'react';

export default function ChartWithDetails() {
    // データのラベルとその値 (nameはラベル、それ以外はそれぞれのグラフの値)

    const data = {
        rawChartData: {
            datasets: {
                counts: {
                label: '平均',
                color: '#4f46e5',
                values: [40, 35, 44, 42, 50, 41, 51]
                },
                mine: {
                label: '自分',
                color: '#ff0000',
                values: [50, 49, 39, 43, 44, 56, 58]
                }
            },
            labels: ['6/8', '6/9', '6/10', '6/11', '6/12', '6/13', '6/14']
        },
        details: {
            rankingData: [
                {
                    "kind": "合計回数(1日)ランキング",
                    "content": [
                        {
                            "name": "マッチョ君",
                            "counts": 105,
                            "time": "6/12"
                        },
                        {
                            "name": "ケン・スイ",
                            "counts": 103,
                            "time": "6/14"
                        },
                        {
                            "name": "富士狩",
                            "counts": 102,
                            "time": "6/11"
                        }
                    ]
                },
                {
                    "kind": "最大連続回数",
                    "content": [
                        {
                            "name": "珍亞歩",
                            "counts": 32,
                            "time": "6/10"
                        },
                        {
                            "name": "ケン・スイ",
                            "counts": 27,
                            "time": "6/11"
                        },
                        {
                            "name": "マッチョ君",
                            "counts": 25,
                            "time": "6/12"
                        }
                    ]
                }
            ],
        }
    }

    return (
        <div className="mx-4">
            <BarGraph {...data.rawChartData}/>
            <Details rankingData={data.details.rankingData}/>
        </div>
    )
}