import { tOnesRankingList, rankingColors } from "@/lib/TypeDeclarations";

export default async function OnesRankings({rankingList, period}: {rankingList: tOnesRankingList; period: string}) {
    
    return (
        <div className="space-y-3 mx-auto">
            <p className="text-center text-2xl font-bold">順位表</p>
            <table className="table-auto text-center border-4 border-black">
                <thead>
                    <tr>
                        <th className="px-5 py-3">項目\{period}</th>
                        {rankingList.date.map((d) => (
                            <th key={d} className="px-5 py-3" >{d}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rankingList.rankings.map((r, rIndex) => (
                        <tr key={rIndex}>
                            <td className="px-5 py-3 font-semibold">{r.name}</td>
                                {r.ranks.map((rk, rkIndex) => (
                                    <td key={rkIndex} className={`px-5 py-3 ${rankingColors[rk-1]}`}>
                                        {rk}
                                    </td>
                                ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}