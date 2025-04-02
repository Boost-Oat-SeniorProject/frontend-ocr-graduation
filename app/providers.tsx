'use client'

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/react";

export function Provider({children}:{children: React.ReactNode}){
    return (
        <HeroUIProvider>
            <ToastProvider placement="top-center"/>
            {children}
        </HeroUIProvider>
    )
}