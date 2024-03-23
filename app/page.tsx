import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { TextAnimation } from "@/components/animations/text-animation";

export default function Home() {
    return (
        <div className="container h-screen flex flex-col items-start justify-start max-w-none  px-0">
            <div className="flex-row p-10 flex dark:border-r ">
                <div className="z-20 flex items-center text-lg font-medium">
                    <Image
                        src="/simpl3.svg"
                        alt="simpl3 Logo"
                        width={100}
                        height={24}
                        priority
                    />
                </div>
            </div>

            <TextAnimation />

            <div className="flex items-center justify-center py-12 bg-muted w-full">
                <div className="mx-auto grid w-[450px] gap-6">

                    <div className="grid gap-4">
                        <Button type="submit" className="w-full" size={"lg"}>
                            Get started
                        </Button>
                    </div>
                    <p className="text-balance text-muted-foreground text-center text-xs">
                        <Link href="">Learn more</Link>
                    </p>
                </div>
            </div>
        </div >
    );
}
