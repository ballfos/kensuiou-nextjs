"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg"; // <CgProfile />
import { CiLogout } from "react-icons/ci"; // <CiLogin />
import { Button } from "./ui/button";

export default function UserButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-2xl text-yellow-600">{status}aaaa</p>; // 読み込み中は何も表示しないか、ローディング表示を追加
  } else if (status === "authenticated") {
    return (
      <div className="flex w-fit space-x-2 text-2xl">
        <Link href="/edit" className="flex flex-col items-center">
          <CgProfile stroke="#ffeb3b" size="2em" />
          {session?.user?.name || "情報変更"}
        </Link>
        <Link href="/logout" className="flex flex-col items-center">
          <CiLogout stroke="#ffeb3b" size="2em" />
          ログアウト
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex w-fit space-x-2 text-2xl">
        <Button asChild variant="outline">
          <Link
            href="/login"
            className="flex flex-col items-center border-yellow-500"
          >
            ログイン
          </Link>
        </Button>
      </div>
    );
  }
}
