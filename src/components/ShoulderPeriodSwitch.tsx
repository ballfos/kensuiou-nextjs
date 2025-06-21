import Link from "next/link";

export default async function ShoulderPeriodSwitch({page, shoulder, period} : {page: string, shoulder: string, period: string}) {
    const shoulderLinks = ["Narrow", "Wide"];
    const periodLinks = ["Day", "Week", "Total"];

    return (
      <div className="flex justify-center space-x-2 mb-4">
        <div className="border-yellow-600 border-2 p-4 rounded w-fit">
          {periodLinks.map((p, pindex) => (
            <Link
              key={pindex}
              href={`${page}?period=${p}&shoulder=${shoulder}`}
              className={`no-underline p-2 text-3xl rounded ${
                period === p
                  ? "bg-yellow-600 text-white"
                  : "bg-white text-yellow-600"
              }`}
            >
            {p}
            </Link>
          ))}
        </div>
        <div className="border-yellow-600 border-2 p-4 rounded w-fit ">
          {shoulderLinks.map((s, sindex) => (
            <Link
              key={sindex}
              href={`${page}?period=${period}&shoulder=${s}`}
              className={`no-underline p-2 text-3xl rounded ${
                shoulder === s
                  ? "bg-yellow-600 text-white"
                  : "bg-white text-yellow-600"
              }`}
            >
            {s}
            </Link>
          ))}
        </div>
      </div>
    )
}