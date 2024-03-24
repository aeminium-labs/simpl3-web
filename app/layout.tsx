import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/app/fonts";
import { ThemeProvider } from "@/components/theme-provider";


export const metadata: Metadata = {
    title: "simpl3 - The protocol for building web3 products",
    description: "Build better products for the web3 generation with simpl3's protocol and access dozens of services with one click. Blockchain doesn't need to be hard, it can be made simpl3.",
    openGraph: {

    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
