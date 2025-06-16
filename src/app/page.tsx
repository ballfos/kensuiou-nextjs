import ChartWithRankings from "@/components/ChartWithRanking";
import { tData } from "@/components/ChartWithRankingsTS";

import { headers } from 'next/headers';
import Link from 'next/link';

export default async function Home({ searchParams }:{ searchParams: {[key: string]: string | undefined}}) {
    const grip = (await searchParams).grip === 'wide' ? 'wide' : 'narrow';

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
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-stretch">
                {data.map((d, dIndex) => (
                    <ChartWithRankings key={dIndex} data={d}/>
                ))}
            </div>
            <footer className="fixed md:w-128 w-fit right-2 top-2 space-x-4 border-yellow-600 border-2 p-2 rounded">
                <Link href="/" className={`no-underline p-2 text-2xl rounded ${grip === 'narrow' ? "bg-yellow-600 text-white" : "bg-white text-yellow-600"}`}>ナロー</Link>
                <Link href="/?grip=wide" className={`no-underline p-2 text-2xl rounded ${grip === 'wide' ? "bg-yellow-600 text-white" : "bg-white text-yellow-600"}`}>ワイド</Link>
            </footer>
        </>
    );
}
