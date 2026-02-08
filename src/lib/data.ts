import { getDataFromDB } from "./db";

export type CountData = {
  member_id: string;
  nickname: string;
  counts: number;
  rank: number;
};

async function fetchCountDataList(
  period: "today" | "this_week" | "total",
  wide: boolean,
  funcName: "sum" | "max",
) {
  const wideSymbol = wide ? "wide" : "narrow";
  const columnName = `${period}_${wideSymbol}_${funcName}_counts`;
  const query = `
    SELECT
      member_id,
      nickname,
      ${columnName} AS counts,
      RANK() OVER (ORDER BY ${columnName} DESC) AS rank
    FROM
      aggregate_view
    ORDER BY
      counts DESC
    `;
  return (await getDataFromDB(query)) as CountData[];
}

export { fetchCountDataList };
