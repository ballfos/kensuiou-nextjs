'use client';

import BarGraph from '@/components/BarGraph';
import { useState } from 'react';

export default function ResultWindow() {
    // timeは後でDate型に切り替えるかもしれない
    const rankingData = [
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
    ];

    const rankingColors = [
        "text-orange-300",
        "text-gray-500",
        "text-orange-700",
        "text-gray-400"
    ]

    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const rankingLength = rankingData.length;

    return (
        <div className="mx-4">
            <BarGraph />
            <div className="flex items-center">
                <button onClick={() => 
                    setSelectedIndex((prevSI) => {
                        if(prevSI === 0){
                            return rankingLength-1;
                        } 
                        else{
                            return prevSI-1
                        }
                    })} className="text-lg font-mono w-fit">
                    ◀︎
                </button>
                <div className="flex-grow h-fit text-center space-y-2">
                    <p>{rankingData[selectedIndex].kind}</p>
                    <ul>
                        {rankingData[selectedIndex].content.map((rd, rdIndex) => {
                            return (
                                <li key={rdIndex} className={rdIndex <= 2 ? rankingColors[rdIndex] : rankingColors[3]}>
                                    {rdIndex+1}位: {rd.name} {rd.counts}回 ({rd.time})
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <button onClick={() => 
                    setSelectedIndex((prevSI) => {
                        if(prevSI === rankingLength-1){
                            return 0;
                        } 
                        else{
                            return prevSI+1
                        }
                    })} className="text-lg font-mono w-fit">
                    ▶︎
                </button>
            </div>
        </div>
    )
}