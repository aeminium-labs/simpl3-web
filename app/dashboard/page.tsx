"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/icons/logo";
import { HomeIcon, MenuSquareIcon, MoreIcon, NewTwitterIcon, NotificationIcon, UserAccountIcon } from "@/components/icons/huge-icons";
import { useSimpl3Auth } from "@simpl3/ui";
import React from "react";
import { useRouter } from "next/navigation";

function trimWalletAddress(address: string, chars: number = 5) {
    if (address.length <= chars * 2) {
        return address;
    }

    const firstChars = address.slice(0, chars);
    const lastChars = address.slice(-chars);

    return `${firstChars}...${lastChars}`;
}

export default function Dashboard() {
    const { getAddress, logout, isLoggedIn } = useSimpl3Auth();
    const router = useRouter()

    React.useEffect(() => {
        if (!isLoggedIn) {
            router.push("/")
        }
    }, [isLoggedIn, router])

    const address = trimWalletAddress(getAddress() || "");

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center  px-4 lg:h-[60px] lg:px-6">
                        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                            <Logo width={100} height="100%" />
                        </Link>

                    </div>
                    <div className="flex-1">
                        <nav className="grid gap-2 items-start px-2 text-sm font-medium lg:px-4">
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg bg-primary text-primary-foreground px-3 py-2  transition-all hover:text-primary-foreground"
                            >
                                <HomeIcon className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:text-primary"
                            >
                                <MenuSquareIcon className="h-4 w-4" />
                                Apps
                            </Link>
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Stay up to date</CardTitle>
                                <CardDescription>
                                    We&apos;re constantly adding new exciting things to simpl3 so make sure to follow us!
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button size="sm" className="w-full">
                                    Follow on <NewTwitterIcon width={16} className="ml-1" />
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <MoreIcon className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Logo width={100} height="100%" />
                                </Link>
                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <HomeIcon className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                                >
                                    Products{" "}
                                </Link>
                            </nav>
                            <div className="mt-auto">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Stay up to date</CardTitle>
                                        <CardDescription>
                                            Make sure you don&apos;t miss anything
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button size="sm" className="w-full">
                                            Follow on <NewTwitterIcon width={16} className="ml-1" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">

                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-10 w-10">
                            <NotificationIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-10 w-10">
                                    <UserAccountIcon className="h-5 w-5" />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Account <small>({address})</small></DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <ThemeToggle />
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 px-4 pb-4 pt-2 lg:gap-6 lg:px-4">
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">Recent Activity</h1>
                    </div>
                    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-2xl font-bold tracking-tight">
                                You have no activity
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Your app activity will show up here once you start<br />using any apps built with simpl3
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
