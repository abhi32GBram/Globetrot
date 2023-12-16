"use client";

// Import relevant types from Prisma client
import { Follow, User } from "@prisma/client";

// Access sidebar state using useSidebar hook from store
import { useSidebar } from "@/store/use-sidebar";

// Import user item components for displaying user information
import { UserItem, UserItemSkeleton } from "./user-item";

// Interface for received data props
interface FollowingProps {
    data: (Follow & {
        following: User & {
            stream: { isLive: boolean } | null
        }
    })[]; // Array of Follow objects with enriched User data
}

export const Following = ({ data }: FollowingProps) => {
    // Get collapsed state from sidebar store
    const { collapsed } = useSidebar((state) => state);

    // Only render if data is available
    if (!data.length) return null;

    return (
        <div>
            {!collapsed && ( // Only show heading if sidebar is expanded
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">Following</p>
                </div>
            )}
            <ul className="space-y-2 px-2">
                {data.map((follow) => ( // Map each follow object to a UserItem component
                    <UserItem
                        key={follow.following.id} // Use following user ID as unique key
                        username={follow.following.username}
                        imageUrl={follow.following.imageUrl}
                        isLive={follow.following.stream?.isLive}
                    />
                ))}
            </ul>
        </div>
    );
};

// Component to display placeholder while data is loading
export const FollowingSkeleton = () => {
    return (
        <ul className="px-2 pt-2 lg:pt-0">
            {[...Array(3)].map((_, i) => ( // Render 3 skeleton UserItem components
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    );
};
