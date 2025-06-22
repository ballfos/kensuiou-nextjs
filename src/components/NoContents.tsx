import Image from "next/image";

export default function NoContents() {
    return (
        <div className="w-full h-128 flex flex-col items-center justify-center">
            <p className="text-center text-4xl">表示できるデータがありません!!</p>
            <Image width={256} height={256} src="/sad_aquatan.png" alt="" />
        </div>
    )
}