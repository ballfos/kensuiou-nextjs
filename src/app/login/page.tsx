"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [id, setId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // signIn に渡すproviderは CredentialsProviderの場合 "credentials"
    const result = await signIn("credentials", {
      redirect: false,
      id,
    });

    if (result?.error) {
      setError("ログインに失敗しました。IDを確認してください。");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="w-fit mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">ログイン</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-2xl">
          ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </label>

        {error && <p className="text-red-600">{error}</p>}

        <Button type="submit" className="bg-yellow-600 text-4xl p-6 border-yellow-600 border-2 hover:text-yellow-600 hover:bg-white">
          ログイン
        </Button>
      </form>
    </div>
  );
}
