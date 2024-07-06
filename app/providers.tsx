"use client"

import { ThemeProvider } from "@/components/theme-provider";
import { Simpl3AuthProvider } from "@simpl3/ui";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Simpl3AuthProvider appId="018f9ae9-8457-73bb-b13b-abc77dacd484">
                {children}
            </Simpl3AuthProvider>
        </ThemeProvider>
    )
}