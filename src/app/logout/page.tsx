// 例: logout ボタンで実行
"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  return (
      <div className="w-fit mx-auto p-4">
        <p className="text-yellow-600 text-6xl mb-4">ログアウトしますか?</p>
        <div className="w-full flex justify-evenly">
          <Button onClick={() => router.back()}
            className="bg-blue-600 text-4xl p-6 border-blue-600 border-2 hover:text-blue-600 hover:bg-white">
            いいえ
          </Button>
          <Button onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-600 text-4xl p-6 border-red-600 border-2 hover:text-red-600 hover:bg-white">
            はい
          </Button>
        </div>
      </div>
  );
}
