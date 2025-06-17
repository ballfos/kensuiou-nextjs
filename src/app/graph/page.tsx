// import ChartWithRankings from "@/components/ChartWithRanking";
// import BarGraph from "@/components/BarGraph";
// import { tData } from "@/components/ChartWithRankingsTS";
import { tLineData } from '@/lib/TypeDeclarations';
import LineGraphs from "@/components/LineGraphs";
import Link from "next/link";

export default async function Home({searchParams}: {searchParams: { [key: string]: string | undefined }}) {
    const shoulder = (await searchParams).shoulder || "Narrow";
    const period = (await searchParams).period || "Day";

    const data: tLineData[] = [
        {
        period: "Day",
        records: [
            {
            type: "最大回数",
            lineChartData: [
                {name: "6/11", a1234: 12},
                {name: "6/12", a1234: 12},
                {name: "6/13", a1234: 13},
                {name: "6/14", a1234: 14},
                {name: "6/15", a1234: 14},
                {name: "6/16", a1234: 15},
                {name: "6/17", a1234: 16},
            ],
            },
            {
            type: "合計",
            lineChartData: [
                {name: "6/11", a1234: 32},
                {name: "6/12", a1234: 48},
                {name: "6/13", a1234: 61},
                {name: "6/14", a1234: 79},
                {name: "6/15", a1234: 95},
                {name: "6/16", a1234: 120},
                {name: "6/17", a1234: 140},
            ],
            },
        ],
        },
        {
        period: "Week",
        records: [
            {
            type: "最大回数",
            lineChartData: [
                {name: "5/25~5/31", a1234: 9},
                {name: "6/1~6/7", a1234: 10},
                {name: "6/8~6/14", a1234: 14},
                {name: "6/15~6/17", a1234: 16}
            ],
            },
            {
            type: "合計",
            lineChartData: [
                {name: "5/25~5/31", a1234: 0},
                {name: "6/1~6/7", a1234: 0},
                {name: "6/8~6/14", a1234: 79},
                {name: "6/15~6/17", a1234: 140}
            ],
            },
        ],
        },
        {
        period: "Total",
        records: [
            {
            type: "最大回数",
            lineChartData: [
                {name: "3", a1234: 0},
                {name: "4", a1234: 0},
                {name: "5", a1234: 0},
                {name: "6", a1234: 16}
            ],
            },
            {
            type: "合計",
            lineChartData: [
                {name: "3", a1234: 0},
                {name: "4", a1234: 0},
                {name: "5", a1234: 0},
                {name: "6", a1234: 140}
            ],
            },
        ],
        },
    ];

    const periodData = data.find((d) => d.period === period);

    const shoulderLinks = ["Narrow", "Wide"];
    const periodLinks = ["Day", "Week", "Total"];

    return (
        <>
            <div className="flex justify-center space-x-2 mb-4">
                <div className="border-yellow-600 border-2 p-2 rounded w-fit">
                    {periodLinks.map((p, pindex) => (
                        <Link key={pindex} href={`/?period=${p}&shoulder=${shoulder}`}
                            className={`no-underline p-2 text-2xl rounded ${period === p ? "bg-yellow-600 text-white": "bg-white text-yellow-600"}`}>
                            {p} {/* リンクのテキスト */}
                        </Link>
                    ))}
                </div>
                <div className="border-yellow-600 border-2 p-2 rounded w-fit">
                    {shoulderLinks.map((s, sindex) => (
                        <Link key={sindex} href={`/?period=${period}&shoulder=${s}`}
                            className={`no-underline p-2 text-2xl rounded ${shoulder === s ? "bg-yellow-600 text-white": "bg-white text-yellow-600"}`}>
                            {s} {/* リンクのテキスト */}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                {periodData ?
                    <LineGraphs lineData={periodData}/> : <p className="text-center">表示できるデータがありません!!</p>
                }
            </div>
        </>
    );
}
