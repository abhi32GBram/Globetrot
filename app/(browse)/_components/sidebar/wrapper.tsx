"use client" // Indicates that this script should run on the client side in a Next.js application.

import { cn } from '@/lib/utils' // Importing a utility function for conditional class naming.
import { useSidebar } from '@/store/use-sidebar' // Importing a custom hook for managing sidebar state.
import { useState, useEffect } from 'react'
import { ToggleSkeleton } from './toggle'
import { RecommendedSkeleton } from './user-item'
import { FollowingSkeleton } from './following'
interface WrapperProps {
    children: React.ReactNode // Declaring the type for the children prop, which can be any valid React node.
}


export const Wrapper = ({ children }: WrapperProps) => { // Defining the Wrapper functional component with destructuring of props.
    const [isClient, setisClient] = useState(false)
    const { collapsed } = useSidebar((state) => state) // Using the custom hook to get the current state of the sidebar (collapsed or not).

    useEffect(() => {
        setisClient(true)
    }, [])

    if (!isClient) {
        return (
            <aside className='fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#bba2eb] z-50'>
                <ToggleSkeleton />
                <FollowingSkeleton />
                <RecommendedSkeleton />
            </aside>
        )
    }

    return (
        <aside className={cn(
            'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#bba2eb] z-50', // Base classes for the sidebar.
            collapsed && "w-[70px]" // Conditional class that adjusts the width of the sidebar when it's collapsed.
        )}>
            {children}
        </aside>
    )
}
