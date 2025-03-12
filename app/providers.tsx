'use client'

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export function Provider({children}:{children: React.ReactNode}){
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    )
}