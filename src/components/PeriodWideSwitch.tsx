import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const periodLabels = ["DAILY", "WEEKLY", "TOTAL"];
const periodOptions = ["today", "this_week", "total"];
const wideLabels = ["NARROW", "WIDE"];
const wideOptions = [false, true];

export default async function PeriodWideSwitch({
  wide,
  period,
}: {
  wide: boolean;
  period: "today" | "this_week" | "total";
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 p-2 md:flex-row">
      <ul className="flex w-full flex-[3] flex-row rounded-full border-2 border-yellow-600 p-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="relative inline-block grow text-center">
            {period === periodOptions[index] && (
              <Image
                width={64}
                height={64}
                src="/muscle_aquatan.png"
                alt=""
                className="absolute bottom-full left-4 z-10 size-10"
              />
            )}
            <Link
              href={`/?period=${periodOptions[index]}&wide=${wide}`}
              className={cn(
                "inline-block w-full rounded-full p-2 font-mono text-xl font-black no-underline",
                period === periodOptions[index]
                  ? "bg-yellow-600 text-white"
                  : "bg-white text-yellow-600",
              )}
            >
              {periodLabels[index]}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex w-full flex-[2] flex-row rounded-full border-2 border-yellow-600 p-1">
        {Array.from({ length: 2 }).map((_, index) => (
          <li key={index} className="relative inline-block grow text-center">
            {wide === wideOptions[index] && (
              <Image
                width={64}
                height={64}
                src="/muscle_aquatan.png"
                alt=""
                className="absolute bottom-full left-4 z-10 size-10"
              />
            )}
            <Link
              href={`/?period=${period}&wide=${wideOptions[index]}`}
              className={cn(
                "inline-block w-full rounded-full p-2 font-mono text-xl font-black no-underline",
                wide === wideOptions[index]
                  ? "bg-yellow-600 text-white"
                  : "bg-white text-yellow-600",
              )}
            >
              {wideLabels[index]}
            </Link>
          </li>
        ))}
      </ul>
      {/* <div className="w-full space-x-2 rounded border-2 border-yellow-600 p-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="relative inline-block text-center">
            {wide === wideOptions[index] && (
              <Image
                width={64}
                height={64}
                src="/muscle_aquatan.png"
                alt=""
                className="absolute bottom-full left-0 z-10"
              />
            )}
            <Link
              href={`/?period=${period}&wide=${wideOptions[index]}`}
              className={`inline-block w-fit rounded p-2 text-3xl no-underline ${wide === wideOptions[index] ? "bg-yellow-600 text-white" : "bg-white text-yellow-600"} `}
            >
              {wideLabels[index]}
            </Link>
          </div>
        ))}
      </div> */}
    </div>
  );
}
