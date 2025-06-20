import { tData, RawMemberData } from "@/lib/TypeDeclarations";
import ChartWithRankings from "@/components/ChartWithRankings";
import Link from "next/link";
import { getDataFromDB } from "@/lib/db";
import { transformData } from "@/lib/TransformData";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const shoulder = (await searchParams).shoulder || "Narrow";
  const period = (await searchParams).period || "Day";

  const query = "SELECT * FROM aggregate_view";
  const rawdata: RawMemberData[] = await getDataFromDB(query);

  // const rawdata = [
  //   {
  //     member_id: "cb493d35-750c-4d60-9c88-4452e640ee57",
  //     nickname: "Gakkun",
  //     today_narrow_sum_counts: 5,
  //     today_narrow_max_counts: 5,
  //     today_wide_sum_counts: 0,
  //     today_wide_max_counts: 0,
  //     this_week_narrow_sum_counts: 5,
  //     this_week_narrow_max_counts: 5,
  //     this_week_wide_sum_counts: 0,
  //     this_week_wide_max_counts: 0,
  //     total_narrow_sum_counts: 11,
  //     total_narrow_max_counts: 5,
  //     total_wide_sum_counts: 5,
  //     total_wide_max_counts: 3,
  //   },
  //   {
  //     member_id: "78a7c6dd-5136-45a8-ae51-cd4abcc6f85d",
  //     nickname: "Ryochinup",
  //     today_narrow_sum_counts: 1,
  //     today_narrow_max_counts: 1,
  //     today_wide_sum_counts: 0,
  //     today_wide_max_counts: 0,
  //     this_week_narrow_sum_counts: 1,
  //     this_week_narrow_max_counts: 1,
  //     this_week_wide_sum_counts: 2,
  //     this_week_wide_max_counts: 2,
  //     total_narrow_sum_counts: 12,
  //     total_narrow_max_counts: 6,
  //     total_wide_sum_counts: 9,
  //     total_wide_max_counts: 4,
  //   },
  //   {
  //     member_id: "bf8432fc-f4c3-48ec-8268-bbd26786fea1",
  //     nickname: "Tomohiro",
  //     today_narrow_sum_counts: 0,
  //     today_narrow_max_counts: 0,
  //     today_wide_sum_counts: 6,
  //     today_wide_max_counts: 6,
  //     this_week_narrow_sum_counts: 4,
  //     this_week_narrow_max_counts: 4,
  //     this_week_wide_sum_counts: 6,
  //     this_week_wide_max_counts: 6,
  //     total_narrow_sum_counts: 9,
  //     total_narrow_max_counts: 4,
  //     total_wide_sum_counts: 12,
  //     total_wide_max_counts: 6,
  //   },
  //   {
  //     member_id: "d295a5ef-74de-4486-b656-e1a312a72753",
  //     nickname: "Kotaro",
  //     today_narrow_sum_counts: 0,
  //     today_narrow_max_counts: 0,
  //     today_wide_sum_counts: 0,
  //     today_wide_max_counts: 0,
  //     this_week_narrow_sum_counts: 0,
  //     this_week_narrow_max_counts: 0,
  //     this_week_wide_sum_counts: 0,
  //     this_week_wide_max_counts: 0,
  //     total_narrow_sum_counts: 2,
  //     total_narrow_max_counts: 2,
  //     total_wide_sum_counts: 0,
  //     total_wide_max_counts: 0,
  //   },
  //   {
  //     member_id: "6a5ae626-52c8-447e-8ca2-cefc97a631cd",
  //     nickname: "Daichaaan",
  //     today_narrow_sum_counts: 0,
  //     today_narrow_max_counts: 0,
  //     today_wide_sum_counts: 0,
  //     today_wide_max_counts: 0,
  //     this_week_narrow_sum_counts: 0,
  //     this_week_narrow_max_counts: 0,
  //     this_week_wide_sum_counts: 0,
  //     this_week_wide_max_counts: 0,
  //     total_narrow_sum_counts: 0,
  //     total_narrow_max_counts: 0,
  //     total_wide_sum_counts: 1,
  //     total_wide_max_counts: 1,
  //   },
  // ];
  // 生データを新しいtData[]の型に変換
  
  const data: tData[] = transformData(rawdata);

  // 1. shoulderに基づいてshoulderデータを選択
  const shoulderData = data.find((d) => d.shoulder === shoulder);
  // 2. sholderデータの中から、periodに基づいて表示するデータを選択
  const selectedPeriodData = shoulderData?.periods.find(
    (p) => p.period === period
  );

  const shoulderLinks = ["Narrow", "Wide"];
  const periodLinks = ["Day", "Week", "Total"];
  // return <span>{JSON.stringify(rawdata)}</span>;
  return (
    <>
      <div className="flex justify-center space-x-2 mb-4 ">
        <div className="border-yellow-600 border-2 p-2 rounded w-fit ">
          {periodLinks.map((p, pindex) => (
            <Link
              key={pindex}
              href={`/?period=${p}&shoulder=${shoulder}`}
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
        <div className="border-yellow-600 border-2 p-2 rounded w-fit ">
          {shoulderLinks.map((s, sindex) => (
            <Link
              key={sindex}
              href={`/?period=${period}&shoulder=${s}`}
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

      <div className="space-y-2 ">
        {selectedPeriodData ? (
          <ChartWithRankings data={selectedPeriodData} />
        ) : (
          <p className="text-center">表示できるデータがありません!!</p>
        )}
      </div>
    </>
  );
}
