'use client';

import BarGraph from '@/components/BarGraph';
import Rankings from '@/components/Rankings';
import { tData } from '@/components/ChartWithRankingsTS';

export default function ChartWithRankings({data}: {data: tData}) {

    return (
        <div className="mx-4 h-full">
            <BarGraph rawChartConfig={data.rawChartConfig}/>
            <Rankings rankings={data.rankings}/>
        </div>
    )
}