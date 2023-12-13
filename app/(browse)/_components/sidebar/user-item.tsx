'use client'

// Importing necessary modules and components
import React from 'react'
import { usePathname } from 'next/navigation' // Hook to get the current pathname from Next.js router

import { cn } from '@/lib/utils' // Utility function for conditional className
import { Button } from '@/components/ui/button' // Button component
import { Skeleton } from '@/components/ui/skeleton' // Skeleton component for loading states

import { useSidebar } from '@/store/use-sidebar' // Custom hook to manage sidebar state
import Link from 'next/link' // Next.js Link component
import { UserAvatar } from '@/components/user-avatar' // UserAvatar component
import { VariantProps } from 'class-variance-authority' // Utility for handling CSS variants
import { LiveBadge } from '@/components/live-badge' // Component to show a live badge

// Interface defining the props for UserItem component
interface UserItemProps {
    username: string
    imageUrl: string
    isLive?: boolean // Optional prop to indicate live status
}

// UserItem component definition
export const UserItem = ({ username, imageUrl, isLive }: UserItemProps) => {
    const pathname = usePathname() // Current pathname from the router
    const { collapsed } = useSidebar((state) => state) // State of the sidebar (collapsed or not)

    const href = `/${username}` // URL for user profile
    const isActive = pathname === href // Boolean to check if the current path is the user's profile

    // Return JSX for UserItem
    return (
        <Button asChild variant="ghost" className={cn(
            "w-full h-12",
            collapsed ? "justify-center" : "justify-start",
            isActive && "bg-accent"
        )}>
            <Link href={href} >
                <div className={cn(
                    "flex items-center w-full gap-x-4",
                    collapsed && "justify-center"
                )}>
                    {/* User avatar with live status indication */}
                    <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive} />
                    {/* Conditionally render username and live badge based on sidebar state */}
                    {!collapsed && (
                        <p className='truncate'>
                            {username}
                        </p>
                    )}
                    {!collapsed && isLive && (
                        <LiveBadge classname='ml-auto' />
                    )}
                </div>
            </Link>
        </Button>
    )
}

// Component to display a skeleton loader for UserItem
export const UserItemSkeleton = () => {
    return (
        <li className='flex items-center gap-x-4 py-2'>
            <Skeleton className='min-h-[32px] min-w-[32px] rounded-full' />
            <div className='flex-1'>
                <Skeleton className='h-6' />
            </div>
        </li>
    )
}

// Component to display a list of skeleton loaders for the Recommended section
export const RecommendedSkeleton = () => {
    return (
        <ul>
            {/* Generate 3 skeleton loaders */}
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}
