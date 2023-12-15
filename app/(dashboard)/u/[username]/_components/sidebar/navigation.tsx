"use client"

// Importing React and necessary hooks from 'nextjs' and '@clerk/nextjs'
import React from 'react'
import { useUser } from '@clerk/nextjs' // Hook to access user information from Clerk
import { usePathname } from 'next/navigation' // Hook to get the current pathname for navigation

// Importing icon components from 'lucide-react' library
import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react'
// Importing NavItem and NavItemSkeleton components for navigation items
import { NavItem, NavItemSkeleton } from './nav-item'

// Define the Navigation functional component
export const Navigation = () => {
    // Retrieve the current pathname using usePathname hook
    const pathname = usePathname()
    // Retrieve the current user object using useUser hook
    const { user } = useUser()

    // Define the navigation routes as an array of objects
    const routes = [
        {
            label: "Stream", // Text label for the navigation item
            href: `/u/${user?.username}`, // URL path, dynamically generated using the username
            icon: Fullscreen // Icon component for this navigation item
        },
        {
            label: "Keys",
            href: `/u/${user?.username}/keys`,
            icon: KeyRound
        },
        {
            label: "Chat",
            href: `/u/${user?.username}/chat`,
            icon: MessageSquare
        },
        {
            label: "Community",
            href: `/u/${user?.username}/community`,
            icon: Users
        },
    ]

    // Conditional rendering based on whether user's username is available
    if (!user?.username) {
        return (
            // Render a list (<ul>) element
            <ul className='space-y-2'> {/* Styling classes */}
                {/* Creating an array of 4 elements to render placeholder skeleton items */}
                {[...Array(4)].map((_, i) => (
                    <NavItemSkeleton key={i} /> // Render NavItemSkeleton for each item
                ))}
            </ul>
        )
    }

    // Render the actual navigation menu when username is available
    return (
        <ul className='space-y-2 px-2 pt-4 lg:pt-0'> {/* Styling classes */}
            {/* Mapping over each route object to render NavItems */}
            {routes.map((route) => (
                // NavItem component with props passed for label, icon, href, and active status
                <NavItem key={route.href} label={route.label} icon={route.icon} href={route.href} isActive={pathname === route.href} />
            ))}
        </ul>
    )
}
