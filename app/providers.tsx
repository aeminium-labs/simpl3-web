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
            <Simpl3AuthProvider appId="simpl3">
                {children}
            </Simpl3AuthProvider>
        </ThemeProvider>
    )
}