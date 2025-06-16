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
            period: "Day",
            records: [
                {
                    type: "合計",
                    barChartConfig: {
                        counts: {
                            color: "#facc15"
                        }
                    },
                    barChartData: [
                        {
                            name: "力 餅",
                            counts: 50
                        },
                        {
                            name: "犬 水",
                            counts: 50
                        },
                        {
                            name: "腕 太",
                            counts: 50
                        }
                    ]
                },
                {
                    type: "最大回数",
                    barChartConfig: {
                        counts: {
                            color: "#facc15"
                        }
                    },
                    barChartData: [
                        {
                            name: "犬 水",
                            counts: 22
                        },
                        {
                            name: "力 餅",
                            counts: 20
                        },
                        {
                            name: "後 李羅",
                            counts: 19
                        }
                    ]
                }
            ]
        },
        {
            period: "Week",
            records: [
                {
                    type: "合計",
                    barChartConfig: {
                        counts: {
                            color: "#facc15"
                        }
                    },
                    barChartData: [
                        {
                            name: "強 我凄",
                            counts: 320
                        },
                        {
                            name: "珍 亞布",
                            counts: 310
                        },
                        {
                            name: "腕 太",
                            counts: 298
                        }
                    ]
                },
                {
                    type: "最大回数",
                    barChartConfig: {
                        counts: {
                            color: "#facc15"
                        }
                    },
                    barChartData: [
                        {
                            name: "強 我凄",
                            counts: 28
                        },
                        {
                            name: "大豪院 邪鬼",
                            counts: 20
                        },
                        {
                            name: "魔金李",
                            counts: 19
                        }
                    ]
                }
            ]
        },
        {
            period: "Month",
            records: [
                {
                    type: "合計",
                    barChartConfig: {
                        counts: {
                            color: "#facc15"
                        }
                    },
                    barChartData: [
                        {
                            name: "我 強凄",
                            counts: 1279
                        },
                        {
                            name: "急現 御免",
                            counts: 1180
                        },
                        {
                            name: "万年 三位",
                            counts: 1158
                        }
                    ]
                },
                {
                    type: "最大回数",
                    barChartConfig: {
                        counts: {
                            color: "#facc15"
                        }
                    },
                    barChartData: [
                        {
                            name: "連 強",
                            counts: 40
                        },
                        {
                            name: "後 少C",
                            counts: 33
                        },
                        {
                            name: "万年 三位",
                            counts: 30
                        }
                    ]
                }
            ]
        },
        {
            period: "Total",
            records: [
                {
                    type: "合計",
                    barChartConfig: {
                        counts: {
                            color: "#facc15"
                        }
                    },
                    barChartData: [
                        {
                            name: "最強⭐︎最強",
                            counts: 2520
                        },
                        {
                            name: "珍 亞布",
                            counts: 2473
                        },
                        {
                            name: "万年 三位",
                            counts: 2398
                        }
                    ]
                },
                {
                    type: "最大回数",
                    barChartConfig: {
                        counts: {
                            color: "#facc15"
                        }
                    },
                    barChartData: [
                        {
                            name: "連 強",
                            counts: 40
                        },
                        {
                            name: "万年 二位",
                            counts: 39
                        },
                        {
                            name: "母母母ー母・母ー母母",
                            counts: 35
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