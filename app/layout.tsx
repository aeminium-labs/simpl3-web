import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/app/fonts";
import { ThemeProvider } from "@/components/theme-provider";


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
