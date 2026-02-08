import { CountData } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";

// const medalImages = ["/goldmedal.png", "/silvermedal.png", "/bronzemedal.png"];
const configByRank = [
  {
    image: "/goldmedal.png",
    alt: "金メダル",
    color: "text-yellow-500",
  },
  {
    image: "/silvermedal.png",
    alt: "銀メダル",
    color: "text-gray-500",
  },
  {
    image: "/bronzemedal.png",
    alt: "銅メダル",
    color: "text-orange-500",
  },
];

export default function Ranking({
  countDataList,
  className,
}: {
  countDataList: CountData[];
  className?: string;
}) {
  return (
    <ol className={cn("flex w-full flex-col", className)}>
      {countDataList.slice(0, 3).map((data) => (
        <li
          key={data.member_id}
          className={cn(
            "mx-1 flex h-20 flex-row items-center gap-2 border-t-2 px-1 text-2xl font-black first:border-t-0",
            configByRank[data.rank - 1].color,
          )}
        >
          <Image
            width={64}
            height={64}
            src={configByRank[data.rank - 1].image}
            alt={`${configByRank[data.rank - 1].alt}`}
            className="overflow-clip"
          />
          <span className="grow">{data.nickname}</span>
          <span className="text-3xl">
            {data.counts}
            <span className="ml-2 text-base">回</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

// export default function Ranking({
//   rankingData,
// }: {
//   rankingData: tBarChartData[];
// }) {
//   return (
//     <div className="flex items-center">
//       <div className="h-fit flex-grow space-y-2 text-center">
//         <div>
//           <ul className="mx-auto w-fit space-y-3 text-left text-3xl lg:text-6xl">
//             {rankingData.map((rd, rdIndex) => {
//               return (
//                 <li
//                   key={rdIndex}
//                   className={`flex items-center space-x-5 ${
//                     rdIndex <= 2 ? rankingColors[rdIndex] : rankingColors[3]
//                   }`}
//                 >
//                   {
//                     <Image
//                       width={64}
//                       height={64}
//                       src={medalImages[rdIndex]}
//                       alt=""
//                     />
//                   }
//                   <span>{rdIndex + 1}位</span>
//                   <span>{rd.name}</span>
//                   <span>{rd.counts}回</span>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
