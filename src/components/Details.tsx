import { tRankingData } from "./ChartWithDetailsTS";
import { useState } from 'react';

export default function Details({ rankingData } : {rankingData: tRankingData[]}) {

    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const rankingLength = rankingData.length;

    const rankingColors = [
        "text-orange-300",
        "text-gray-500",
        "text-orange-700",
        "text-gray-400"
    ];

    return (
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
    )
}