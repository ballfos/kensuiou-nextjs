export type tBarChartData = {
    // id?: string; // プレイヤーの情報をリンクづけるためにあるid
    name: string;
    counts: number;
}

export type tBarChartConfig = {
    counts: {
        label?: string;
        color: string;
    }
}

// 棒グラフとランキング用のデータ
export type tData = {
    period: string; // ここにperiodを設定する
    records: tRecord[]; // この配列はグラフとランキングを格納する
}

export type tRecord = {
    type: string; // ここにmaxかsumのラベルを設定する
    barChartConfig: tBarChartConfig;
    barChartData: tBarChartData[];
};

export const rankingColors= [
    "text-orange-300",
    "text-gray-500",
    "text-orange-700",
    "text-gray-400"
];