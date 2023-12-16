"use client"

// Import the User model from Prisma client for type definitions.
import { Stream, User } from "@prisma/client";

// Import the useSidebar hook from the store for managing sidebar state.
import { useSidebar } from "@/store/use-sidebar";
// Import the UserItem component for displaying individual user details.
import { UserItem } from "./user-item";

// Define the interface for the RecommendedProps.
// This specifies that the 'data' prop will be an array of User objects.
interface RecommendedProps {
    data: (User & {
        stream: { isLive: boolean } | null
    })[]
}

// Define the Recommended component.
// It takes 'data' as a prop, which is an array of User objects.
export const Recommended = ({ data }: RecommendedProps) => {
    // Use the useSidebar hook to get the 'collapsed' state of the sidebar.
    const { collapsed } = useSidebar((state) => state)
    // Determine whether to show the label based on the sidebar's collapsed state and if data is available.
    const showLabel = !collapsed && data.length > 0

    // Return the JSX for the Recommended component.
    return (
        <div>
            {/* Conditionally render a label if showLabel is true */}
            {showLabel && (
                <div className="pl-6 mb-4">
                    {/* Text indicating the section is for recommended users */}
                    <p className="text-sm text-muted-foreground">
                        Recommeneded
                    </p>
                </div>
            )}
            {/* List container for User items */}
            <ul className="space-y-2 px-2">
                {/* Map through each user in the data array and render a UserItem for each */}
                {
                    data.map((user) => (
                        <UserItem key={user.id} username={user.username} imageUrl={user.imageUrl} isLive={user.stream?.isLive} />
                    ))
                }
            </ul>
        </div>
    )
}
