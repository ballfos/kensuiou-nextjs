import ChartWithRankings from "@/components/ChartWithRanking";
import { tData } from "@/components/ChartWithRankingsTS";

import { headers } from 'next/headers';

export default async function Home() {
    // このデータをapi経由でデータベースに接続して取得する
    // ローカルホスト名をheaders関数で取得する
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const absoluteUrl = `${protocol}://${host}`;

    const res = await fetch(`${absoluteUrl}/api/data`, {
      cache: 'no-store'
    });  
    
    if (!res.ok) {
      return (<>データを正常に取得できませんでした、、、</>);
    }

    const data: tData[] = await res.json();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-stretch">
            {data.map((d, dIndex) => (
              <ChartWithRankings key={dIndex} data={d}/>
            ))}
        </div>
    );
}
