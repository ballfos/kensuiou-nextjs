export type tChartData = {
    name: string;
    [key: string]: number | string;
}

export type tChartConfig = {
    [key: string]: {
        label: string;
        color: string;
    }
}

export type tRawChartConfig = {
    datasets: {
        [key: string]: {
            label: string;
            color: string;
            values: number[];
        }
    },
    labels: string[];
}

export type tRankingData = {
    kind: string;
    content:
        {
            name: string;
            counts: string | number;
            time: string;
        }[];
}

const rankingColors= [
    "text-orange-300",
    "text-gray-500",
    "text-orange-700",
    "text-gray-400"
];