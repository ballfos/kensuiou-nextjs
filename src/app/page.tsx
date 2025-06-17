import { tData } from "@/components/BarGraphWithRankingTS";
import ChartWithRankings from "@/components/ChartWithRankings";
import { headers } from "next/headers";
import Link from "next/link";
import { getDataFromDB } from "@/lib/db";
import { transformData } from "@/components/TransformData";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const grip = (await searchParams).grip || "Narrow";
  const period = (await searchParams).period || "Day";

  // このデータをapi経由でデータベースに接続して取得する
  // ローカルホスト名をheaders関数で取得する
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const absoluteUrl = `${protocol}://${host}`;
  const query = "SELECT * FROM aggregate_view";
  const rawdata = await getDataFromDB(query);
  // 生データを新しいtData[]の型に変換
  const data: tData[] = transformData(rawdata);
  //   {JSON.stringify(data, null, 2)}
  //   const res = await fetch(`${absoluteUrl}/api/data`, {
  //     cache: "no-store",
  //   });

  //   if (!res.ok) {
  //     return <>データを正常に取得できませんでした、、、</>;
  //   }

  //   const data: tData[] = await res.json();

  const selectedData = data.find((d) => d.period === period);
  //   return (
  //     <div>
  //       <h1>Data from PostgreSQL</h1>
  //       <pre>{JSON.stringify(data, null, 2)}</pre>
  //     </div>
  //   );

  return (
    <>
      <div className="flex justify-center space-x-2 mb-4">
        <div className="border-yellow-600 border-2 p-2 rounded w-fit">
          {data.map((d, pindex) => (
            <Link
              key={pindex}
              href={`/?period=${d.period}&grip=${grip}`}
              className={`no-underline p-2 text-2xl rounded ${
                period === d.period
                  ? "bg-yellow-600 text-white"
                  : "bg-white text-yellow-600"
              }`}
            >
              {d.period}
            </Link>
          ))}
        </div>
        <div className="border-yellow-600 border-2 p-2 rounded w-fit">
          <Link
            href={`/?period=${period}&grip=Narrow`}
            className={`no-underline p-2 text-2xl rounded ${
              grip === "Narrow"
                ? "bg-yellow-600 text-white"
                : "bg-white text-yellow-600"
            }`}
          >
            Narrow
          </Link>
          <Link
            href={`/?period=${period}&grip=Wide`}
            className={`no-underline p-2 text-2xl rounded ${
              grip === "Wide"
                ? "bg-yellow-600 text-white"
                : "bg-white text-yellow-600"
            }`}
          >
            Wide
          </Link>
        </div>
      </div>
      <div className="space-y-2">
        {selectedData ? (
          <ChartWithRankings data={selectedData} />
        ) : (
          <p className="text-center">表示できるデータがありません!!</p>
        )}
      </div>
    </>
  );
}
