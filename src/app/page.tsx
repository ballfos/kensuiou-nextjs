import Ranking from "@/components/Ranking";
import { RankingChart } from "@/components/RankingChart";
import { authOptions } from "@/lib/auth";
import { fetchCountDataList } from "@/lib/data";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import z from "zod";

const DEFAULT_PERIOD = "this_week";
const DEFAULT_WIDE = false;

const searchParamsSchema = z.object({
  period: z.enum(["today", "this_week", "total"]).default(DEFAULT_PERIOD),
  wide: z.stringbool().default(DEFAULT_WIDE),
});

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // searchParamsの検証と取得
  const parsedParams = searchParamsSchema.safeParse(await searchParams);
  if (!parsedParams.success) {
    redirect(`/?period=${DEFAULT_PERIOD}&wide=${DEFAULT_WIDE}`);
  }
  const { period, wide } = parsedParams.data;

  const session = await getServerSession(authOptions);
  const loginID = session?.user?.id;

  const maxCountDataList = await fetchCountDataList(period, wide, "max");
  const sumCountDataList = await fetchCountDataList(period, wide, "sum");

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* <ShoulderPeriodSwitch page="/" shoulder={shoulder} period={period} /> */}

      <div className="grid w-full gap-4 md:grid-cols-2">
        <Ranking countDataList={maxCountDataList} />
        <RankingChart countDataList={maxCountDataList} />
        <Ranking countDataList={sumCountDataList} />
        <RankingChart countDataList={sumCountDataList} />
      </div>
    </div>
  );
}
