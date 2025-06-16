module.exports = {

"[project]/.next-internal/server/app/api/data/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/data/route.tsx [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
async function GET(req) {
    // ここで外部のデータベースに接続してデータを取得する
    const data = [
        {
            category: "max",
            records: [
                {
                    period: "day",
                    title: "最大値 - 1日の記録",
                    rawChartConfig: {
                        title: "最大値 - 1日の記録",
                        datasets: {},
                        labels: [
                            "6/8",
                            "6/9",
                            "6/10",
                            "6/11",
                            "6/12",
                            "6/13",
                            "6/14"
                        ]
                    },
                    rankings: [
                        {
                            kind: "合計回数ランキング",
                            content: [
                                {
                                    name: "マッチョ君",
                                    counts: 120,
                                    time: "6/12"
                                },
                                {
                                    name: "ケン・スイ",
                                    counts: 115,
                                    time: "6/14"
                                },
                                {
                                    name: "富士狩",
                                    counts: 110,
                                    time: "6/11"
                                }
                            ]
                        }
                    ]
                },
                {
                    period: "week",
                    title: "最大値 - 1週間の記録",
                    rawChartConfig: {
                        title: "最大値 - 1週間の記録",
                        datasets: {},
                        labels: [
                            "5/18~5/24",
                            "5/25~5/31",
                            "6/1~6/7",
                            "6/8~6/14"
                        ]
                    },
                    rankings: [
                        {
                            kind: "合計回数ランキング",
                            content: [
                                {
                                    name: "マッチョ君",
                                    counts: 430,
                                    time: "6/1~6/7"
                                },
                                {
                                    name: "ケン・スイ",
                                    counts: 403,
                                    time: "6/8~6/14"
                                },
                                {
                                    name: "たいし",
                                    counts: 395,
                                    time: "5/25~5/31"
                                }
                            ]
                        }
                    ]
                },
                {
                    period: "all",
                    title: "最大値 - 全期間の記録",
                    rawChartConfig: {
                        title: "最大値 - 全期間の記録",
                        datasets: {},
                        labels: [
                            "1月",
                            "2月",
                            "3月",
                            "4月"
                        ]
                    },
                    rankings: [
                        {
                            kind: "合計回数ランキング",
                            content: [
                                {
                                    name: "マッチョ君",
                                    counts: 1200,
                                    time: "3月"
                                },
                                {
                                    name: "ケン・スイ",
                                    counts: 1150,
                                    time: "4月"
                                },
                                {
                                    name: "たいし",
                                    counts: 1100,
                                    time: "2月"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            category: "sum",
            records: [
                {
                    period: "day",
                    title: "合計値 - 1日の記録",
                    rawChartConfig: {
                        title: "合計値 - 1日の記録",
                        datasets: {},
                        labels: [
                            "6/8",
                            "6/9",
                            "6/10",
                            "6/11",
                            "6/12",
                            "6/13",
                            "6/14"
                        ]
                    },
                    rankings: [
                        {
                            kind: "合計回数ランキング",
                            content: [
                                {
                                    name: "マッチョ君",
                                    counts: 600,
                                    time: "6/12"
                                },
                                {
                                    name: "ケン・スイ",
                                    counts: 580,
                                    time: "6/14"
                                },
                                {
                                    name: "富士狩",
                                    counts: 570,
                                    time: "6/11"
                                }
                            ]
                        }
                    ]
                },
                {
                    period: "week",
                    title: "合計値 - 1週間の記録",
                    rawChartConfig: {
                        title: "合計値 - 1週間の記録",
                        datasets: {},
                        labels: [
                            "5/18~5/24",
                            "5/25~5/31",
                            "6/1~6/7",
                            "6/8~6/14"
                        ]
                    },
                    rankings: [
                        {
                            kind: "合計回数ランキング",
                            content: [
                                {
                                    name: "マッチョ君",
                                    counts: 1800,
                                    time: "6/1~6/7"
                                },
                                {
                                    name: "ケン・スイ",
                                    counts: 1700,
                                    time: "6/8~6/14"
                                },
                                {
                                    name: "たいし",
                                    counts: 1600,
                                    time: "5/25~5/31"
                                }
                            ]
                        }
                    ]
                },
                {
                    period: "all",
                    title: "合計値 - 全期間の記録",
                    rawChartConfig: {
                        title: "合計値 - 全期間の記録",
                        datasets: {},
                        labels: [
                            "1月",
                            "2月",
                            "3月",
                            "4月"
                        ]
                    },
                    rankings: [
                        {
                            kind: "合計回数ランキング",
                            content: [
                                {
                                    name: "マッチョ君",
                                    counts: 5000,
                                    time: "3月"
                                },
                                {
                                    name: "ケン・スイ",
                                    counts: 4800,
                                    time: "4月"
                                },
                                {
                                    name: "たいし",
                                    counts: 4700,
                                    time: "2月"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
    try {
        return new Response(JSON.stringify(data), {
            status: 200
        });
    } catch  {
        return new Response(JSON.stringify("Error fetching genres"), {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__d48a675e._.js.map