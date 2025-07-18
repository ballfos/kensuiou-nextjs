import ChartWithRankings from "@/components/ChartWithRankings";
import NoContents from "@/components/NoContents";
import ShoulderPeriodSwitch from "@/components/ShoulderPeriodSwitch";
import { authOptions } from "@/lib/auth";
import { fetchCountDataList } from "@/lib/data";
import { getDataFromDB } from "@/lib/db";
import { transformData } from "@/lib/TransformData";
import { RawMemberData, tData } from "@/lib/TypeDeclarations";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import z from "zod";

const DEFAULT_PERIOD = "this_week";
const DEFAULT_WIDE = false;

const searchParamsSchema = z.object({
  period: z.enum(["today", "this_week", "total"]).default(DEFAULT_PERIOD),
  wide: z.coerce.boolean().default(DEFAULT_WIDE),
});

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // searchParamsの検証と取得
  const parsedParams = searchParamsSchema.safeParse(await searchParams);
  if (!parsedParams.success) {
    console.error("Invalid search parameters:", parsedParams.error);
    redirect(`/?period=${DEFAULT_PERIOD}&wide=${DEFAULT_WIDE}`);
  }
  const { period, wide } = parsedParams.data;

  const session = await getServerSession(authOptions);
  const loginID = session?.user?.id;

  const query = "SELECT * FROM aggregate_view";
  const rawdata: RawMemberData[] = await getDataFromDB(query);

  const data: tData[] = transformData(rawdata, loginID);

  const shoulder = "Wide";
  // 1. shoulderに基づいてshoulderデータを選択
  const shoulderData = data.find((d) => d.shoulder === shoulder);
  // 2. sholderデータの中から、periodに基づいて表示するデータを選択
  const selectedPeriodData = shoulderData?.periods.find(
    (p) => p.period === "Week",
  );

  const countDataList = await fetchCountDataList(period, wide, "sum");

  return (
    <>
      <ShoulderPeriodSwitch page="/" shoulder={shoulder} period={period} />

      <div className="space-y-2">
        {selectedPeriodData ? (
          <ChartWithRankings data={selectedPeriodData} />
        ) : (
          <NoContents />
        )}
      </div>
    </>
  );
}
