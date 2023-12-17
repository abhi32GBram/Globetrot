"use client";

import { Skeleton } from "@/components/ui/skeleton";

import { ChatToggle } from "./chat-toggle";
import { VariantToggle } from "./variant-toggle";


export const ChatHeader = () => {
    return (
        <div className="relative p-3 border-b">
            <div className="absolute left-2 top-2 hidden lg:block">
                <ChatToggle />
            </div>
            <p className="font-semibold text-priamry text-center">
                Stream Chat
            </p>
            <div className="absolute right-2 top-2">
                <VariantToggle />
            </div>
        </div>
    );
};

export const ChatHeaderSkeleton = () => {
    return (
        <div className="relative p-3 border-b hidden md:block">
            <Skeleton className="absolute h-6 w-6 left-3 top-3" />
            <Skeleton className="w-28 h-6 mx-auto" />
        </div>
    );
};

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE 
// // =========================================================================================================================

// // // Importing the Skeleton component from a specific path.
// // import { Skeleton } from "@/components/ui/skeleton";

// // // Importing two components: ChatToggle and VariantToggle from the current directory.
// // import { ChatToggle } from "./chat-toggle";
// // import { VariantToggle } from "./variant-toggle";

// // // Exporting the ChatHeader functional component.
// // export const ChatHeader = () => {
// //     // Rendering a div with specific classes.
// //     return (
// //         <div className="relative p-3 border-b">
// //             {/* Placing the ChatToggle component in an absolutely positioned div, hidden on smaller screens */}
// //             <div className="absolute left-2 top-2 hidden lg:block">
// //                 <ChatToggle />
// //             </div>
// //             {/* Displaying the title of the chat in a paragraph with styling */}
// //             <p className="font-semibold text-priamry text-center">
// //                 Stream Chat
// //             </p>
// //             {/* Placing the VariantToggle component in an absolutely positioned div */}
// //             <div className="absolute right-2 top-2">
// //                 <VariantToggle />
// //             </div>
// //         </div>
// //     );
// // };

// // // Exporting a skeleton version of the ChatHeader for loading states.
// // export const ChatHeaderSkeleton = () => {
// //     // Render the skeleton placeholders inside a div.
// //     return (
// //         <div className="relative p-3 border-b hidden md:block">
// //             {/* Skeleton placeholder for the ChatToggle */}
// //             <Skeleton className="absolute h-6 w-6 left-3 top-3" />
// //             {/* Skeleton placeholder for the title */}
// //             <Skeleton className="w-28 h-6 mx-auto" />
// //         </div>
// //     );
// // };
