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

export type tData = {
    rawChartConfig: tRawChartConfig;
    rankings: tRanking[];
}

export type tRawChartConfig = {
    title: string,
    datasets: {
        [key: string]: {
            label: string;
            color: string;
            values: number[];
        }
    },
    labels: string[];
}

export type tRanking = {
    kind: string;
    content:
        {
            name: string;
            counts: string | number;
            time: string;
        }[];
}

export const rankingColors= [
    "text-orange-300",
    "text-gray-500",
    "text-orange-700",
    "text-gray-400"
];