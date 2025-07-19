"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiChartLineLight, PiRankingLight, PiUserLight } from "react-icons/pi";

const navLinks = [
  {
    href: "/",
    label: "ranking",
    icon: <PiRankingLight stroke="#ffffff" size="32" />,
  },
  {
    href: "/graph",
    label: "graph",
    icon: <PiChartLineLight stroke="#ffffff" size="32" />,
  },
  {
    href: "/members",
    label: "members",
    icon: <PiUserLight stroke="#ffffff" size="32" />,
  },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 h-14 w-full bg-yellow-600 px-2">
      <div className="mx-auto flex h-full flex-row items-center justify-between md:w-2/3">
        {navLinks.map(({ href, label, icon }) => (
          <Link
            key={href}
            className={cn(
              "flex size-14 flex-col items-center justify-center text-white no-underline",
              {
                "opacity-60": pathname !== href,
              },
            )}
            href={href}
          >
            {icon}
            <span className="text-sm">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
