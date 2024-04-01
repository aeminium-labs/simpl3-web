"use client"

import { Button } from "@/components/ui/button";
import { TextAnimation } from "@/components/animations/text-animation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/icons/logo";
import Link from "next/link";
import { NewTwitterIcon } from "@/components/icons/huge-icons";
import { useSimpl3Auth } from "@simpl3/ui";

export default function Home() {
    const { openAuth, isLoggedIn } = useSimpl3Auth();

    return (
        <div className="container h-screen flex flex-col items-start justify-start space max-w-none  px-0">
            <div className="flex-row p-10 flex justify-between dark:border-r w-full z-10">
                <div className="z-20 flex items-center text-lg font-medium relative text-foreground">
                    <Logo width={100} height="100%" />
                </div>
                <div className="flex flex-row gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="http://x.com/simpl3_protocol" target="_blank" className=""><NewTwitterIcon className="h-[1.2rem] w-[1.2rem]" /></Link>
                    </Button>
                    <ThemeToggle />
                </div>
            </div>

            <TextAnimation />

            <div className="fixed bottom-0 backdrop-blur-md bg-background/10 flex items-center justify-center p-4 md:p-10 w-full">
                <div className="mx-auto grid w-[450px] gap-6 ">
                    <p className="text-balance text-muted-foreground text-center text-xs">
                        The protocol for building great (web3) products
                    </p>
                    <div className="grid gap-4">
                        <Button type="submit" className="w-full" size={"lg"} onClick={openAuth} disabled={isLoggedIn}>
                            Launching soon!
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    );
}
