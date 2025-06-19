import { tOnesData } from '@/lib/TypeDeclarations';
import OnesCharts from "@/components/OnesCharts";
import Link from "next/link";

export default async function Home({searchParams}: {searchParams: { [key: string]: string | undefined }}) {
    const shoulder = (await searchParams).shoulder || "Narrow";
    const period = (await searchParams).period || "Day";


    const data: tOnesData[] = [
        {
        shoulder: "Narrow",
        periods: [
            {
            period: "Day",
            chartsRecords: [
                {
                type: "最大回数",
                barChartData: [
                    { id: "user-1", name: "6/10", counts: 22 },
                    { id: "user-2", name: "6/11", counts: 20 },
                    { id: "user-3", name: "6/12", counts: 19 }
                ]
                },
                {
                type: "合計",
                barChartData: [
                    { id: "user-2", name: "6/10", counts: 50 },
                    { id: "user-1", name: "6/11", counts: 48 },
                    { id: "user-4", name: "6/12", counts: 44 }
                ]
                }
            ],
            lineRecord: {
                type: "累計回数",
                lineChartData: [
                { name: "6/10", a1234: 15 },
                { name: "6/11", a1234: 33 },
                { name: "6/12", a1234: 45 },
                ]
            },
            rankingList: {
                date: ["6/10", "6/11", "6/12"],
                rankings: [
                {
                    name: "回数",
                    ranks: [2, 1, 1]
                },
                {
                    name: "連続回数",
                    ranks: [1, 2, 2]
                },
                {
                    name: "累計",
                    ranks: [3, 3, 3]
                }
                ]
            }
            },
            {
            period: "Week",
            chartsRecords: [
                {
                type: "最大回数",
                barChartData: [
                    { id: "user-5", name: "5/25-5/31", counts: 28 },
                    { id: "user-6", name: "6/1-6/7", counts: 20 },
                    { id: "user-7", name: "6/8-6/12", counts: 19 }
                ]
                },
                {
                type: "合計",
                barChartData: [
                    { id: "user-5", name: "5/25-5/31", counts: 320 },
                    { id: "user-8", name: "6/1-6/7", counts: 310 },
                    { id: "user-4", name: "6/8-6/12", counts: 298 }
                ]
                }
            ],
            lineRecord: {
                type: "累計回数",
                lineChartData: [
                { name: "5/25-5/31", a1234: 50 },
                { name: "6/1-6/7", a1234: 100 },
                { name: "6/8-6/12", a1234: 150 },
                ]
            },
            rankingList: {
                date: ["5/25-5/31", "6/1-6/7", "6/8-6/12"],
                rankings: [
                {
                    name: "回数",
                    ranks: [1, 1, 1]
                },
                {
                    name: "連続回数",
                    ranks: [2, 2, 2]
                },
                {
                    name: "累計",
                    ranks: [3, 3, 3]
                }
                ]
            }
            }
        ]
        }
    ];

    const shoulderData = data.find((sd) => sd.shoulder === shoulder);
    const periodData = shoulderData?.periods.find((d) => d.period === period);

    const shoulderLinks = ["Narrow", "Wide"];
    const periodLinks = ["Day", "Week", "Total"];

    return (
        <>
            <div className="flex justify-center space-x-2 mb-4">
                <div className="border-yellow-600 border-2 p-2 rounded w-fit">
                    {periodLinks.map((p, pindex) => (
                        <Link key={pindex} href={`/members?period=${p}&shoulder=${shoulder}`}
                            className={`no-underline p-2 text-2xl rounded ${period === p ? "bg-yellow-600 text-white": "bg-white text-yellow-600"}`}>
                            {p} {/* リンクのテキスト */}
                        </Link>
                    ))}
                </div>
                <div className="border-yellow-600 border-2 p-2 rounded w-fit">
                    {shoulderLinks.map((s, sindex) => (
                        <Link key={sindex} href={`/members?period=${period}&shoulder=${s}`}
                            className={`no-underline p-2 text-2xl rounded ${shoulder === s ? "bg-yellow-600 text-white": "bg-white text-yellow-600"}`}>
                            {s} {/* リンクのテキスト */}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                {periodData ?
                    <OnesCharts data={periodData} />: <p className="text-center">表示できるデータがありません!!</p>
                }
            </div>
        </>
    );
}