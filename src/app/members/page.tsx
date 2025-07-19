import DateRangeFilter from "@/components/DateRangeFilter";
import NoContents from "@/components/NoContents";
import OnesCharts from "@/components/OnesCharts";
import PeriodWideSwitch from "@/components/PeriodWideSwitch";
import UserSelector from "@/components/UserSelector";
import { authOptions } from "@/lib/auth";
import { getDataFromDB } from "@/lib/db";
import { transformLineDataToOnesData } from "@/lib/TransformData";
import { LineRawMemberData } from "@/lib/TypeDeclarations";
import { getServerSession } from "next-auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const shoulder = (await searchParams).shoulder || "Narrow";
  const period = (await searchParams).period || "Week";
  const limit = (await searchParams).limit || "8";

  const query_line = "SELECT * FROM weekly_aggregate_view";
  const rawdata_line: LineRawMemberData[] = await getDataFromDB(query_line);

  const session = await getServerSession(authOptions);
  const loginID = session?.user?.id;

  const data = transformLineDataToOnesData(
    rawdata_line,
    Number(limit),
    period,
    loginID,
  );

  //   const data: tOnesDataByUser[] = [
  //     {
  //       id: "a1234",
  //       name: "ダミー君",
  //       onesData: [
  //         {
  //           shoulder: "Narrow",
  //           periods: [
  //             {
  //               period: "Day",
  //               chartsRecords: [
  //                 {
  //                   type: "最大回数",
  //                   barChartData: [
  //                     { id: "user-1", name: "6/10", counts: 22 },
  //                     { id: "user-2", name: "6/11", counts: 20 },
  //                     { id: "user-3", name: "6/12", counts: 19 },
  //                   ],
  //                 },
  //                 {
  //                   type: "合計",
  //                   barChartData: [
  //                     { id: "user-2", name: "6/10", counts: 50 },
  //                     { id: "user-1", name: "6/11", counts: 48 },
  //                     { id: "user-4", name: "6/12", counts: 44 },
  //                   ],
  //                 },
  //               ],
  //               lineRecord: [
  //                 {
  //                   type: "累計回数",
  //                   lineChartConfig: {
  //                     a1234: {
  //                       label: "ゴイゴイスー",
  //                       color: "#facc15",
  //                     },
  //                   },
  //                   lineChartData: [
  //                     { name: "6/10", a1234: 15 },
  //                     { name: "6/11", a1234: 33 },
  //                     { name: "6/12", a1234: 45 },
  //                   ],
  //                 },
  //                 {
  //                   type: "連続回数",
  //                   lineChartConfig: {
  //                     a1234: {
  //                       label: "ゴイゴイスー",
  //                       color: "#facc15",
  //                     },
  //                   },
  //                   lineChartData: [
  //                     { name: "6/10", a1234: 15 },
  //                     { name: "6/11", a1234: 18 },
  //                     { name: "6/12", a1234: 18 },
  //                   ],
  //                 },
  //               ],
  //             },
  //             {
  //               period: "Week",
  //               chartsRecords: [
  //                 {
  //                   type: "最大回数",
  //                   barChartData: [
  //                     { id: "user-5", name: "5/25-5/31", counts: 28 },
  //                     { id: "user-6", name: "6/1-6/7", counts: 20 },
  //                     { id: "user-7", name: "6/8-6/12", counts: 19 },
  //                   ],
  //                 },
  //                 {
  //                   type: "合計",
  //                   barChartData: [
  //                     { id: "user-5", name: "5/25-5/31", counts: 320 },
  //                     { id: "user-8", name: "6/1-6/7", counts: 310 },
  //                     { id: "user-4", name: "6/8-6/12", counts: 298 },
  //                   ],
  //                 },
  //               ],
  //               lineRecord: [
  //                 {
  //                   type: "累計回数",
  //                   lineChartConfig: {
  //                     a1234: {
  //                       label: "ゴイゴイスー",
  //                       color: "#facc15",
  //                     },
  //                   },
  //                   lineChartData: [
  //                     { name: "5/25-5/31", a1234: 50 },
  //                     { name: "6/1-6/7", a1234: 100 },
  //                     { name: "6/8-6/12", a1234: 150 },
  //                   ],
  //                 },
  //                 {
  //                   type: "連続回数",
  //                   lineChartConfig: {
  //                     a1234: {
  //                       label: "ゴイゴイスー",
  //                       color: "#facc15",
  //                     },
  //                   },
  //                   lineChartData: [
  //                     { name: "5/25-5/31", a1234: 12 },
  //                     { name: "6/1-6/7", a1234: 13 },
  //                     { name: "6/8-6/12", a1234: 18 },
  //                   ],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       id: "a1238",
  //       name: "デミグラス君",
  //       onesData: [
  //         {
  //           shoulder: "Narrow",
  //           periods: [
  //             {
  //               period: "Day",
  //               chartsRecords: [
  //                 {
  //                   type: "最大回数",
  //                   barChartData: [
  //                     { id: "user-1", name: "6/10", counts: 19 },
  //                     { id: "user-2", name: "6/11", counts: 17 },
  //                     { id: "user-3", name: "6/12", counts: 18 },
  //                   ],
  //                 },
  //                 {
  //                   type: "合計",
  //                   barChartData: [
  //                     { id: "user-2", name: "6/10", counts: 19 },
  //                     { id: "user-1", name: "6/11", counts: 17 },
  //                     { id: "user-4", name: "6/12", counts: 17 },
  //                   ],
  //                 },
  //               ],
  //               lineRecord: [
  //                 {
  //                   type: "累計回数",
  //                   lineChartConfig: {
  //                     a1238: {
  //                       label: "デミグラス君",
  //                       color: "#0000ff",
  //                     },
  //                   },
  //                   lineChartData: [
  //                     { name: "6/10", a1238: 50 },
  //                     { name: "6/11", a1238: 67 },
  //                     { name: "6/12", a1238: 102 },
  //                   ],
  //                 },
  //                 {
  //                   type: "連続回数",
  //                   lineChartConfig: {
  //                     a1238: {
  //                       label: "デミグラス君",
  //                       color: "#0000ff",
  //                     },
  //                   },
  //                   lineChartData: [
  //                     { name: "6/10", a1238: 19 },
  //                     { name: "6/11", a1238: 19 },
  //                     { name: "6/12", a1238: 19 },
  //                   ],
  //                 },
  //               ],
  //             },
  //             {
  //               period: "Week",
  //               chartsRecords: [
  //                 {
  //                   type: "最大回数",
  //                   barChartData: [
  //                     { id: "user-5", name: "5/25-5/31", counts: 22 },
  //                     { id: "user-6", name: "6/1-6/7", counts: 20 },
  //                     { id: "user-7", name: "6/8-6/12", counts: 19 },
  //                   ],
  //                 },
  //                 {
  //                   type: "合計",
  //                   barChartData: [
  //                     { id: "user-5", name: "5/25-5/31", counts: 320 },
  //                     { id: "user-8", name: "6/1-6/7", counts: 310 },
  //                     { id: "user-4", name: "6/8-6/12", counts: 298 },
  //                   ],
  //                 },
  //               ],
  //               lineRecord: [
  //                 {
  //                   type: "累計回数",
  //                   lineChartConfig: {
  //                     a1238: {
  //                       label: "デミグラス君",
  //                       color: "#0000ff",
  //                     },
  //                   },
  //                   lineChartData: [
  //                     { name: "5/25-5/31", a1238: 420 },
  //                     { name: "6/1-6/7", a1238: 730 },
  //                     { name: "6/8-6/12", a1238: 1028 },
  //                   ],
  //                 },
  //                 {
  //                   type: "連続回数",
  //                   lineChartConfig: {
  //                     a1238: {
  //                       label: "デミグラス君",
  //                       color: "#0000ff",
  //                     },
  //                   },
  //                   lineChartData: [
  //                     { name: "5/25-5/31", a1238: 16 },
  //                     { name: "6/1-6/7", a1238: 18 },
  //                     { name: "6/8-6/12", a1238: 19 },
  //                   ],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ];

  const id = (await searchParams).id || data[0].id;

  const selectedData = data.find((d) => d.id === id);
  const selectedUser = selectedData?.name;

  const shoulderData = selectedData?.onesData.find(
    (sd) => sd.shoulder === shoulder,
  );
  const periodData = shoulderData?.periods.find(
    (d) =>
      d.period === period &&
      (d.chartsRecords.length !== 0 || d.lineRecord.length !== 0),
  );

  const users = data
    .filter((ud) => ud.id !== loginID)
    .map((ud) => ({ id: ud.id, name: ud.name }));

  return (
    <div className="space-y-4">
      <PeriodWideSwitch page="/members" shoulder={shoulder} period={period} />
      <div className="mx-auto flex w-fit items-center gap-x-2">
        <UserSelector
          users={users}
          id={id}
          shoulder={shoulder}
          period={period}
        />
        <p className="text-3xl text-yellow-600">さんの</p>
        <DateRangeFilter
          page="/members"
          limit={limit}
          shoulder={shoulder}
          period={period}
          id={id}
        />
      </div>
      <div className="space-y-2">
        {periodData ? (
          <OnesCharts data={periodData} selectedUser={selectedUser} />
        ) : (
          <NoContents />
        )}
      </div>
    </div>
  );
}
