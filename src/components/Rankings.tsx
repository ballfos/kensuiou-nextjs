import { tBarChartData, rankingColors } from "@/components/BarGraphWithRankingTS";

export default function Ranking({ rankingData }: { rankingData: tBarChartData[] }) {

  return (
      <div className="flex items-center">
          <div className="flex-grow h-fit text-center space-y-2">
              <div>
                  <ul className="w-fit text-left mx-auto text-2xl">
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
      </div>
  );
}
