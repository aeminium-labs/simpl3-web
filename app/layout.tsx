import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/app/fonts";
import { ThemeProvider } from "@/components/theme-provider";


export const metadata: Metadata = {
    metadataBase: new URL('https://www.madesimpl3.com'),
    title: "simpl3 - The protocol for building web3 products",
    description: "Build better products for the web3 generation with simpl3's protocol and access dozens of services with one click. Blockchain doesn't need to be hard, it can be made simpl3.",
    icons: {
        icon: [
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/favicon.png", type: "image/png" },
            { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
            { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        ],
    },
    manifest: "/site.webmanifest",
    openGraph: {
        title: "simpl3 - The protocol for building web3 products",
        description: "Build better products for the web3 generation with simpl3's protocol and access dozens of services with one click. Blockchain doesn't need to be hard, it can be made simpl3.",
        url: "https://www.madesimpl3.com",
        siteName: "simpl3",
        images: [
            {
                url: "/og-simpl3.jpg",
                width: 800,
                height: 400,
            },
        ],
        locale: "en-US",
        type: "website",
    },
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
