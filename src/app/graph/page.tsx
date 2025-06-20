import { LineRawMemberData } from "@/lib/TypeDeclarations";
import LineGraphs from "@/components/LineGraphs";
import Link from "next/link";
import { getDataFromDB } from "@/lib/db";
import { transformToLineChartData } from "@/lib/TransformData";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const shoulder = ((await searchParams).shoulder || "Narrow") as
    | "Narrow"
    | "Wide";
  const period = (await searchParams).period || "Week";
  const query = "SELECT * FROM weekly_aggregate_view";
  const rawdata: LineRawMemberData[] = await getDataFromDB(query);

  const data = transformToLineChartData(rawdata, shoulder);
  
  //   const data: tLineData[] = [
  //     {
  //       period: "Week",
  //       records: [
  //         {
  //           type: "Max",
  //           lineChartData: [
  //             { name: "5/25~5/31", a1234: 9 },
  //             { name: "6/1~6/7", a1234: 10 },
  //             { name: "6/8~6/14", a1234: 14 },
  //             { name: "6/15~6/17", a1234: 16 },
  //           ],
  //         },
  //         {
  //           type: "Sum",
  //           lineChartData: [
  //             { name: "5/25~5/31", a1234: 0 },
  //             { name: "6/1~6/7", a1234: 0 },
  //             { name: "6/8~6/14", a1234: 79 },
  //             { name: "6/15~6/17", a1234: 140 },
  //           ],
  //         },
  //       ],
  //     },
  //   ];

  const periodData = data.find((d) => d.period === period);

  const shoulderLinks = ["Narrow", "Wide"];
  const periodLinks = ["Day", "Week", "Total"];
  //   return <span>{JSON.stringify(rawdata)}</span>;
  return (
    <>
      <div className="flex justify-center space-x-2 mb-4">
        <div className="border-yellow-600 border-2 p-2 rounded w-fit">
          {periodLinks.map((p, pindex) => (
            <Link
              key={pindex}
              href={`/graph?period=${p}&shoulder=${shoulder}`}
              className={`no-underline p-2 text-2xl rounded ${
                period === p
                  ? "bg-yellow-600 text-white"
                  : "bg-white text-yellow-600"
              }`}
            >
              {p} {/* リンクのテキスト */}
            </Link>
          ))}
        </div>
        <div className="border-yellow-600 border-2 p-2 rounded w-fit">
          {shoulderLinks.map((s, sindex) => (
            <Link
              key={sindex}
              href={`/graph?period=${period}&shoulder=${s}`}
              className={`no-underline p-2 text-2xl rounded ${
                shoulder === s
                  ? "bg-yellow-600 text-white"
                  : "bg-white text-yellow-600"
              }`}
            >
              {s} {/* リンクのテキスト */}
            </Link>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {periodData ? (
          <LineGraphs lineData={periodData} />
        ) : (
          <p className="text-center">表示できるデータがありません!!</p>
        )}
      </div>
    </>
  );
}
