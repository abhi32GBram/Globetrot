import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
})

export const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="bg-[#7138c7] rounded-full p-1">
                <Image src="/smile.svg" alt="Globetrot" height={80} width={80}  priority={true}/>
            </div>
            <div className="flex flex-col items-center ">
                <p className={cn(
                    "font-xl font-semibold",
                    font.className
                )}>
                    Globetrot
                </p>
                <p className={cn(
                    "text-sm text-muted-foreground",
                    font.className
                )}>
                    The world is waiting, tune in...
                </p>
            </div>
        </div>
    )
}