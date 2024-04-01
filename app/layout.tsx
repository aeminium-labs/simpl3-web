import type { Metadata } from "next";
import "@simpl3/ui/dist/style.css";
import "./globals.css";
import { inter } from "@/app/fonts";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
    metadataBase: new URL('https://www.madesimpl3.com'),
    title: "simpl3 - The protocol for building great (web3) products",
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
        title: "simpl3 - The protocol for building great (web3) products",
        description: "Build better products for the web3 generation with simpl3's protocol and access dozens of services with one click. Blockchain doesn't need to be hard, it can be made simpl3.",
        url: "https://www.madesimpl3.com",
        siteName: "simpl3",
        images: [
            {
                url: "/og-simpl3.png",
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
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
