// Importing required modules and components
import { cva, type VariantProps } from "class-variance-authority" // Utility for creating variant classes
import { cn } from "@/lib/utils" // Utility for conditional class names

import { Skeleton } from "@/components/ui/skeleton" // Skeleton component for loading states
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // Components for avatar display

import React from 'react'
import { LiveBadge } from "@/components/live-badge" // Component to display a live badge

// Define avatar size variants using class-variance-authority
const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                default: "h-8 w-8", // Default avatar size
                lg: "h-14 w-14", // Larger avatar size
            },
        },
        defaultVariants: {
            size: "default", // Set 'default' as the default variant
        },
    },
);

// Interface for UserAvatar props with extended variant properties
interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    username: string;
    imageUrl: string;
    isLive?: boolean; // Optional prop to indicate if the user is live
    showBadge?: boolean; // Optional prop to decide if the live badge should be shown
};

// UserAvatar component definition
export const UserAvatar = ({
    username,
    imageUrl,
    isLive,
    showBadge,
    size,
}: UserAvatarProps) => {
    const canShowBadge = showBadge && isLive; // Determine if the live badge should be displayed

    // Return JSX for UserAvatar
    return (
        <div className="relative">
            {/* Avatar component with conditional styling for live users */}
            <Avatar
                className={cn(
                    isLive && "ring-2 ring-rose-500 border border-background", // Add ring style if the user is live
                    avatarSizes({ size }) // Apply size variant
                )}>
                <AvatarImage src={imageUrl} className="object-cover" /> {/* User's avatar image */}
                <AvatarFallback>
                    {/* Fallback content showing the first and last characters of username */}
                    {username[0]}
                    {username[username.length - 1]}
                </AvatarFallback>
            </Avatar>
            {/* Conditionally render LiveBadge */}
            {canShowBadge && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <LiveBadge />
                </div>
            )}
        </div>
    );
};

// Interface for UserAvatarSkeleton props with extended variant properties
interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {

}

// UserAvatarSkeleton component definition
export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
    // Return JSX for UserAvatarSkeleton
    return (
        <Skeleton className={cn(
            "rounded-full", // Round shape for the skeleton
            avatarSizes({ size }) // Apply size variant
        )} />
    )
}
