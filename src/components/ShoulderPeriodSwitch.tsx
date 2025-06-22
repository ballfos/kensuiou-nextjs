import Link from "next/link";
import Image from "next/image";

export default async function ShoulderPeriodSwitch({page, shoulder, period} : {page: string, shoulder: string, period: string}) {
    const shoulderLinks = ["Narrow", "Wide"];
    const periodLinks = ["Day", "Week", "Total"];

    return (
      <div className="flex justify-center space-x-2 mt-15 mb-4">
        <div className="border-yellow-600 border-2 p-2 rounded w-fit space-x-2">
          {periodLinks.map((p, pindex) => (
          <div key={pindex} className="relative inline-block text-center">
            {period === p && (
              <Image width={64} height={64} src="/muscle_aquatan.png" alt="" className="absolute bottom-full left-1/2 -translate-x-1/2 z-10" />
            )}
            <Link
              href={`${page}?period=${p}&shoulder=${shoulder}`}
              className={`no-underline p-2 text-3xl rounded inline-block w-fit
                ${period === p ? "bg-yellow-600 text-white" : "bg-white text-yellow-600"}
              `}
            >
              {p}
            </Link>
          </div>
          ))}
        </div>
        <div className="border-yellow-600 border-2 p-2 rounded w-fit space-x-2">
          {shoulderLinks.map((s, sindex) => (
          <div key={sindex} className="relative inline-block text-center">
            {shoulder === s && (
              <Image width={64} height={64} src="/muscle_aquatan.png" alt="" className="absolute bottom-full left-1/2 -translate-x-1/2 z-10" />
            )}
            <Link
              href={`${page}?period=${period}&shoulder=${s}`}
              className={`no-underline p-2 text-3xl rounded inline-block w-fit
                ${shoulder === s ? "bg-yellow-600 text-white" : "bg-white text-yellow-600"}
              `}
            >
              {s}
            </Link>
          </div>
          ))}
        </div>
      </div>
    )
}