import { describe, expect, it } from "vitest";
import { fetchCountDataList } from "./data";

describe("fetchCountDataList", () => {
  const periods: Array<"today" | "this_week" | "total"> = [
    "today",
    "this_week",
    "total",
  ];
  const wideOptions: Array<boolean> = [true, false];
  const funcNames: Array<"sum" | "max"> = ["sum", "max"];

  for (const period of periods) {
    for (const wide of wideOptions) {
      for (const funcName of funcNames) {
        it(`should fetch count data for period: ${period}, wide: ${wide}, funcName: ${funcName}`, async () => {
          const result = await fetchCountDataList(period, wide, funcName);
          expect(result).toBeDefined();
          expect(Array.isArray(result)).toBe(true);
          result.forEach((item) => {
            expect(item).toHaveProperty("member_id");
            expect(item).toHaveProperty("nickname");
            expect(item).toHaveProperty("counts");
            expect(item).toHaveProperty("rank");
          });
        });
      }
    }
  }
});
