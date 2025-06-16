import ChartWithRankings from "@/components/ChartWithRanking";
import { tData } from "@/components/ChartWithRankingsTS";
import DayWeekAllChartWithRanking from "@/components/DayWeekAllChartWithRanking";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const grip = (await searchParams).grip === "wide" ? "wide" : "narrow";

  // このデータをapi経由でデータベースに接続して取得する
  // ローカルホスト名をheaders関数で取得する
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const absoluteUrl = `${protocol}://${host}`;

  const res = await fetch(`${absoluteUrl}/api/data`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <>データを正常に取得できませんでした、、、</>;
  }

  const data: tData[] = await res.json();

  return (
    <>
      <div className="space-y-2">
        {data.map((d, index) => (
          <DayWeekAllChartWithRanking key={index} data={d} />
        ))}
      </div>
      <div className="fixed w-fit right-2 top-2 space-x-4 border-yellow-600 border-2 p-2 rounded">
        <Link
          href="/"
          className={`no-underline p-2 text-2xl rounded ${
            grip === "narrow"
              ? "bg-yellow-600 text-white"
              : "bg-white text-yellow-600"
          }`}
        >
          ナロー
        </Link>
        <Link
          href="/?grip=wide"
          className={`no-underline p-2 text-2xl rounded ${
            grip === "wide"
              ? "bg-yellow-600 text-white"
              : "bg-white text-yellow-600"
          }`}
        >
          ワイド
        </Link>
      </div>
    </>
  );
}
