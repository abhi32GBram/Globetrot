"use client"
// Import necessary components and functions
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';

// Import reusable components and utils
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

// Define interface for NavItem props
interface NavItemProps {
    icon: LucideIcon; // Icon component to display
    label: string; // Text label for the navigation item
    href: string; // URL to navigate to on click
    isActive: boolean; // Whether this is the currently active item
}

// NavItem component renders a navigation item button with optional label
export const NavItem = ({ icon: Icon, label, href, isActive }: NavItemProps) => {
    // Access collapsed state from creator sidebar context
    const { collapsed } = useCreatorSidebar((state) => state);

    // Render a ghost button with dynamic className based on props and state
    return (
        <Button
            variant="ghost" // Transparent button style
            asChild // Renders button content directly
            className={cn(
                "w-full h-12", // Consistent button size
                collapsed ? "justify-center" : "justify-start", // Adjust content alignment based on collapsed state
                isActive && "bg-accent", // Highlight active item with accent background
            )}
        >
            {/* Wrap content in Link component for navigation */}
            <Link href={href}>
                {/* Display icon and label in a flexbox layout */}
                <div className="flex items-center gap-x-4">
                    {/* Render provided icon with size and margin adjustments */}
                    <Icon
                        className={cn(
                            "h-4 w-4", // Consistent icon size
                            collapsed ? "mr-0" : "mr-2", // Adjust margin based on collapsed state
                        )}
                    />
                    {!collapsed && ( // Show label only when sidebar is not collapsed
                        <span>{label}</span> // Display navigation item text
                    )}
                </div>
            </Link>
        </Button>
    );
};

// NavItemSkeleton displays a placeholder while data is loading
export const NavItemSkeleton = () => (
    <li className="flex items-center gap-x-2 px-3 py-2">
        {/* Show a skeleton placeholder for the icon */}
        <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
        <div className="flex-1 hidden lg:block">
            {/* Show a skeleton placeholder for the label (visible on larger screens) */}
            <Skeleton className="h-6" />
        </div>
    </li>
);
