import { tBarChartData, rankingColors } from "@/components/BarGraphWithRankingTS";
// import { useState } from 'react';

// day, week, month, totalで切り替えられるようにする
export default function Ranking({ rankingData }: { rankingData: tBarChartData[] }) {
  // const [selectedIndex, setSelectedIndex] = useState<number>(0);
  // const rankingLength = rankings.length;

  return (
      <div className="flex items-center">
        {/* <button
          onClick={() =>
            setSelectedIndex((prevSI) => {
              return (prevSI - 1) % rankingLength;
            })
          }
          className="text-lg font-mono"
        >
          ◀︎
        </button> */}
        <div className="flex-grow h-fit text-center space-y-2">
          {/* <p>{rankings[selectedIndex].kind}</p> */}
          <div>
            <ul className="w-fit text-left mx-auto">
              {rankingData.map((rd, rdIndex) => {
                  return (
                    <li key={rdIndex} className={`${rdIndex <= 2 ? rankingColors[rdIndex] : rankingColors[3]}`}>
                      {rdIndex + 1}位: {rd.name} {rd.counts}回
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        {/* <button
          onClick={() =>
            setSelectedIndex((prevSI) => {
              return (prevSI + 1) % rankingLength;
            })
          }
          className="text-lg font-mono"
        >
          ▶︎
        </button> */}
      </div>
  );
}
