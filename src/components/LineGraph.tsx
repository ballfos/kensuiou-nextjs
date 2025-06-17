import { tLineRecord } from '@/lib/TypeDeclarations';
import LineGraphCard from '@/components/LineGraphCard';

export default async function LineGraph({lineRecord}: {lineRecord: tLineRecord}) {
    return (
        <div className="mx-4 h-full">
            <h2 className="text-2xl font-bold text-center">{lineRecord.type}</h2>
            <LineGraphCard lineChartData={lineRecord.lineChartData} />
        </div>
    );
}
