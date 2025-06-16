import { tRanking, rankingColors } from "./ChartWithRankingsTS";
import { useState } from 'react';

export default function Ranking({ rankings }: { rankings: tRanking[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const rankingLength = rankings.length;

  return (
      <div className="flex items-center">
        <button
          onClick={() =>
            setSelectedIndex((prevSI) => {
              return (prevSI - 1) % rankingLength;
            })
          }
          className="text-lg font-mono"
        >
          ◀︎
        </button>
        <div className="flex-grow h-fit text-center space-y-2">
          <p>{rankings[selectedIndex].kind}</p>
          <div>
            <ul className="w-fit text-left mx-auto">
              {rankings[selectedIndex].content
                .map((rd, rdIndex) => {
                  return (
                    <li key={rdIndex} className={`${rdIndex <= 2 ? rankingColors[rdIndex] : rankingColors[3]}`}>
                      {rdIndex + 1}位: {rd.name} {rd.counts}回
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <button
          onClick={() =>
            setSelectedIndex((prevSI) => {
              return (prevSI + 1) % rankingLength;
            })
          }
          className="text-lg font-mono"
        >
          ▶︎
        </button>
      </div>
  );
}
