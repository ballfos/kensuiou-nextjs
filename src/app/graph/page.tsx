import { LineRawMemberData } from "@/lib/TypeDeclarations";
import LineGraphs from "@/components/LineGraphs";
import ShoulderPeriodSwitch from "@/components/ShoulderPeriodSwitch";
import { getDataFromDB } from "@/lib/db";
import { transformToLineChartData } from "@/lib/TransformData";
import DateRangeFilter from "@/components/DateRangeFilter";
import NoContents from "@/components/NoContents";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const shoulder = ((await searchParams).shoulder || "Narrow") as
    | "Narrow"
    | "Wide";
  const period = (await searchParams).period || "Week";
  const limit = (await searchParams).limit || "8";

  const query = "SELECT * FROM weekly_aggregate_view";
  const rawdata: LineRawMemberData[] = await getDataFromDB(query);

  const session = await getServerSession(authOptions);
  const loginID = session?.user?.id

  const data = transformToLineChartData(rawdata, shoulder, Number(limit), period, loginID);
  
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

  //   return <span>{JSON.stringify(rawdata)}</span>;
  return (
    <>
      <ShoulderPeriodSwitch page="/graph" shoulder={shoulder} period={period} />
      <div className="w-fit mx-auto my-2">
        <DateRangeFilter page="/graph" limit={limit} shoulder={shoulder} period={period}/>
      </div>
      <div className="space-y-2">
        {periodData ? 
          <LineGraphs lineData={periodData} />
        :
          <NoContents />
        }
      </div>
    </>
  );
}
