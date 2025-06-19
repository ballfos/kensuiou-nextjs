// 棒グラフとランキング用のデータ
export type tBarChartData = {
    id: string; // プレイヤーの情報をリンクづけるためにあるid
    name: string;
    counts: number;
}

export type tBarChartConfig = {
    counts: {
        label?: string;
        color: string;
    }
}

export type tData = {
    shoulder: string; 
    periods: tPeriodData[]; // periodの配列を持つように変更
}

export type tPeriodData = {
    period: string;
    records: tRecord[];
}

export type tRecord = {
    type: string; // "Max" または "Sum" のいずれか
    barChartData: tBarChartData[];
};

// 折れ線グラフとランキング用のデータ
export type tLineData = {
    period: string; // ここにperiodを設定する
    records: tLineRecord[]; // この配列はグラフとランキングを格納する
}

export type tLineRecord = {
    type: string; // ここにmaxかsumのラベルを設定する
    lineChartData: tLineChartData[];
};

export type tLineChartData = {
    //日付
    name: string;
    // このキーにはユーザーのIDを設定する (一意性の確保、IDなので文字列になる)
    [key: string]: string | number;
}

export type tLineChartConfig = {
    // このキーも上のIDと同じ
    [key: string]: {
        label: string;
        color: string;
    }
}

// 最近の順位表を作る
// ユーザーごとのデータ
export type tOnesDataByUser = {
    id: string;
    name: string;
    onesData: tOnesData[];
}

// 個人データの中身
export type tOnesData = {
    shoulder: string; 
    periods: tOnesPeriodData[]; // periodの配列を持つように変更
}

export type tOnesPeriodData = {
    period: string;
    // 個人の棒グラフは一日ごとも連続回数もランキングの時のものを流用
    chartsRecords: tRecord[];
    // 累計回数も流用
    lineRecord: tLineRecord;
    // あと何を載せるか考えよう!! (それぞれのデータに関するランキングを表示する)
    rankingList?: tOnesRankingList;
}

export type tOnesRankingList = {
    date: string[];
    rankings: tOnesRanking[];
}

export type tOnesRanking = {
    name: string;
    ranks: number[];
}

export type RawMemberData = {
    member_id: string;
    nickname: string;
    today_narrow_sum_counts: number;
    today_narrow_max_counts: number;
    today_wide_sum_counts: number;
    today_wide_max_counts: number;
    this_week_narrow_sum_counts: number;
    this_week_narrow_max_counts: number;
    this_week_wide_sum_counts: number;
    this_week_wide_max_counts: number;
    total_narrow_sum_counts: number;
    total_narrow_max_counts: number;
    total_wide_sum_counts: number;
    total_wide_max_counts: number;
};

export type LineRawMemberData ={
    member_id: string;
    nickname: string;
    week_start_date:string;
    max_narrow_counts: number;
    max_wide_counts: number;
}
export const rankingColors= [
    "text-orange-300",
    "text-gray-500",
    "text-orange-700",
    "text-gray-400"
];