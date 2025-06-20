"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";

export default function UserSelector({
  users,
  id,
  shoulder,
  period,
}: {
  users: { id: string; name: string }[];
  id: string;
  shoulder: string;
  period: string;
}) {
  const router = useRouter();

  return (
    <Select
      defaultValue={id}
      onValueChange={(value) =>
        router.push(
          `/members?shoulder=${shoulder}&period=${period}&id=${value}`
        )
      }
    >
      <SelectTrigger className="w-[280px] font-bold text-3xl border-yellow-600 text-yellow-600">
        <SelectValue placeholder="ユーザー名" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {users.map((user) => (
            <SelectItem
              key={user.id}
              value={user.id}
              className="font-bold text-3xl text-yellow-600 data-[highlighted]:bg-yellow-600 data-[highlighted]:text-white"
            >
              {user.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
