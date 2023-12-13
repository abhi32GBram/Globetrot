"use client" // Indicates that this script should run on the client side in a Next.js application.

import { cn } from '@/lib/utils' // Importing a utility function for conditional class naming.
interface WrapperProps {
    children: React.ReactNode // Declaring the type for the children prop, which can be any valid React node.
}

import { useSidebar } from '@/store/use-sidebar' // Importing a custom hook for managing sidebar state.
import React from 'react' 

export const Wrapper = ({ children }: WrapperProps) => { // Defining the Wrapper functional component with destructuring of props.
    const { collapsed } = useSidebar((state) => state) // Using the custom hook to get the current state of the sidebar (collapsed or not).

    return (
        <aside className={cn(
            'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#bba2eb] z-50', // Base classes for the sidebar.
            collapsed && "w-[70px]" // Conditional class that adjusts the width of the sidebar when it's collapsed.
        )}>
            {children} 
        </aside>
    )
}
