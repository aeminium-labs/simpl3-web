import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/app/fonts";


export const metadata: Metadata = {
    title: "simpl3",
    description: "Blockchain made simpl3",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
