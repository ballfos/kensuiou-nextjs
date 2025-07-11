import Image from "next/image";
import { tBarChartData, rankingColors } from "@/lib/TypeDeclarations";

export default function Ranking({
  rankingData,
}: {
  rankingData: tBarChartData[];
}) {
  const medalImages = [
    "/goldmedal.png",
    "/silvermedal.png",
    "/bronzemedal.png",
  ];
  return (
    <div className="flex items-center">
      <div className="flex-grow h-fit text-center space-y-2">
        <div>
          <ul className="w-fit text-left mx-auto text-3xl lg:text-6xl space-y-3">
            {rankingData.map((rd, rdIndex) => {
              return (
                <li
                  key={rdIndex}
                  className={`flex items-center space-x-5 ${
                    rdIndex <= 2 ? rankingColors[rdIndex] : rankingColors[3]
                  }`}
                >
                  {
                    <Image
                      width={64}
                      height={64}
                      src={medalImages[rdIndex]}
                      alt=""
                    />
                  }
                  <span>{rdIndex + 1}位</span>
                  <span>{rd.name}</span>
                  <span>{rd.counts}回</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
