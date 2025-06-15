import { tRanking, rankingColors } from "./ChartWithRankingsTS";
import { useState } from 'react';

export default function Ranking({ rankings } : {rankings: tRanking[]}) {

    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const rankingLength = rankings.length;

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
                <p>{rankings[selectedIndex].kind}</p>
                <ul>
                    {rankings[selectedIndex].content.map((rd, rdIndex) => {
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