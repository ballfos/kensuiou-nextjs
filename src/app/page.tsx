import PeriodWideSwitch from "@/components/PeriodWideSwitch";
import Ranking from "@/components/Ranking";
import { RankingChart } from "@/components/RankingChart";
import { Skeleton } from "@/components/ui/skeleton";
import { CountData, fetchCountDataList } from "@/lib/data";
import { redirect } from "next/navigation";
import { Suspense } from "react";
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

  // TODO: 認証ユーザのハイライト対応
  // const session = await getServerSession(authOptions);
  // const loginID = session?.user?.id;

  const sumCountDataList = fetchCountDataList(period, wide, "sum");
  const maxCountDataList = fetchCountDataList(period, wide, "max");

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <PeriodWideSwitch wide={wide} period={period} />

      <div className="grid w-full gap-4 md:grid-cols-2">
        <Suspense fallback={<RankingBlockSkeleton />}>
          <RankingBlock title="MAX" countDataList={maxCountDataList} />
        </Suspense>
        <Suspense fallback={<RankingBlockSkeleton />}>
          <RankingBlock title="SUM" countDataList={sumCountDataList} />
        </Suspense>
      </div>
    </div>
  );
}

const RankingBlock = async (props: {
  title: string;
  countDataList: Promise<CountData[]>;
}) => {
  const title = props.title;
  const countDataList = await props.countDataList;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-3xl font-bold">{title}</h2>
      <Ranking countDataList={countDataList} />
      <RankingChart countDataList={countDataList} />
    </div>
  );
};

const RankingBlockSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Skeleton className="h-8 w-1/2" />
      <div className="flex w-full flex-col items-center gap-4 p-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-18 w-full rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  );
};
