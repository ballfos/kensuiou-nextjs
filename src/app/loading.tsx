'use client'

import { useEffect, useState } from 'react';
import Image from "next/image";

export default function HomeLoading() {
    // #region 画面のチラつき対策 (ロード画面は読み込み時間が長い場合のみ表示する)
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
        setShouldShow(true)
        }, 200) // 200ms以上かかったときだけ表示

        return () => clearTimeout(timer)
    }, [])

    if (!shouldShow) return null;
    // #endregion

    return (
        <div className="flex flex-col justify-center items-center h-screen" aria-label="Now Loading...">
            <Image width={32} height={32} src="/chinups.gif" alt="Now Loading..." unoptimized />
            Now Loading...
        </div>
    );
}