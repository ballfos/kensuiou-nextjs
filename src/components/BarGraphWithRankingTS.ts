export type tBarChartData = {
    // id?: string; // プレイヤーの情報をリンクづけるためにあるid
    name: string;
    counts: number;
}

// export type tBarChartConfig = {
    
//     counts: {
//         label?: string;
//         color: string;
//     }
// }

// 棒グラフとランキング用のデータ

export type tData = {
    sholder: string; 
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

export type ChartConfig = {
    counts: {
      label?: React.ReactNode;
      icon?: React.ComponentType<{}>;
      color?: string; // 'hsl(...)' を許容する型
    };
    dataKey: keyof RawMemberData; // 必須プロパティとして追加
  };

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


export const rankingColors= [
    "text-orange-300",
    "text-gray-500",
    "text-orange-700",
    "text-gray-400"
];