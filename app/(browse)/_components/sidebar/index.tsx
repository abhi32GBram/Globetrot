// Import necessary components and services
import { getRecommended } from "@/lib/recommended-service"; // Importing the service to get recommended items
import { Wrapper } from "./wrapper"; // Importing a Wrapper component for layout purposes
import Toggle, { ToggleSkeleton } from "./toggle"; // Importing a Toggle component, possibly for UI interactivity
import { Recommended } from "./recommended"; // Importing a Recommended component to display recommended items
import { RecommendedSkeleton } from "./user-item"; // Importing a skeleton screen for loading state of recommended items

// Define the Sidebar component as an asynchronous function
export const Sidebar = async () => {
    const recommended = await getRecommended(); // Await the fetching of recommended data from the service

    // Return the JSX for the Sidebar
    return (
        <Wrapper>
            <Toggle /> {/* Render the Toggle component */}
            <div className="space-y-4 pt-4 lg:pt-0">
                {/* Container for the recommended items with styling */}
                <Recommended data={recommended} /> {/* Render Recommended component with the fetched data */}
            </div>
        </Wrapper>
    );
};

// Define the SidebarSkeleton component for loading state
export const SidebarSkeleton = () => {
    return (
        // JSX for the sidebar skeleton
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[] z-50">
            <ToggleSkeleton />
            <RecommendedSkeleton /> {/* Render the skeleton screen for recommended items */}

        </aside>
    )
}
