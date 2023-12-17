import { Info } from "lucide-react";
import { useMemo } from "react";
import { Hint } from "@/components/hint";

interface ChatInfoProps {
    isDelay: boolean
    isFollowersOnly: boolean
}

import React from 'react'

export const ChatInfo = ({ isDelay, isFollowersOnly }: ChatInfoProps) => {

    const hint = useMemo(() => {
        if (isFollowersOnly && !isDelay) {
            return "Only Followers can Chat"
        }

        if (isDelay && !isFollowersOnly) {
            return "Chat is Delayed by 3.5s"
        }

        if (isDelay && isFollowersOnly) {
            return "Only Followers Can Chat & Chat is Delayed by 3.5s"
        }

        return ""
    }, [isDelay, isFollowersOnly])

    const label = useMemo(() => {
        if (isFollowersOnly && !isDelay) {
            return "Followers Only "
        }

        if (isDelay && !isFollowersOnly) {
            return "Slow Mode"
        }

        if (isDelay && isFollowersOnly) {
            return "Follower Only Chat & Slow Mode "
        }

        return ""
    }, [isDelay, isFollowersOnly])

    if (!isDelay && !isFollowersOnly) {
        return null
    }
    return (
        <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
            <Hint label={hint}>
                <Info className="h-4 w-4" />
            </Hint>
            <p className="text-xs font-semibold">
                {label}
            </p>
        </div>
    );
}


// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE 
// // =========================================================================================================================

// // // Importing the Info icon component from 'lucide-react' library.
// // import { Info } from "lucide-react";
// // // Importing the useMemo hook from React.
// // import { useMemo } from "react";
// // // Importing the Hint component from a specific path.
// // import { Hint } from "@/components/hint";

// // // Defining the structure of the props for ChatInfo component.
// // interface ChatInfoProps {
// //     isDelay: boolean
// //     isFollowersOnly: boolean
// // }

// // // Importing React.
// // import React from 'react'

// // // Exporting the ChatInfo functional component, destructuring its props.
// // export const ChatInfo = ({ isDelay, isFollowersOnly }: ChatInfoProps) => {

// //     // Using useMemo to compute hint text based on isDelay and isFollowersOnly.
// //     const hint = useMemo(() => {
// //         if (isFollowersOnly && !isDelay) {
// //             return "Only Followers can Chat"
// //         }

// //         if (isDelay && !isFollowersOnly) {
// //             return "Chat is Delayed by 3.5s"
// //         }

// //         if (isDelay && isFollowersOnly) {
// //             return "Only Followers Can Chat & Chat is Delayed by 3.5s"
// //         }

// //         return ""
// //     }, [isDelay, isFollowersOnly])

// //     // Using useMemo to compute label text based on isDelay and isFollowersOnly.
// //     const label = useMemo(() => {
// //         if (isFollowersOnly && !isDelay) {
// //             return "Followers Only "
// //         }

// //         if (isDelay && !isFollowersOnly) {
// //             return "Slow Mode"
// //         }

// //         if (isDelay && isFollowersOnly) {
// //             return "Follower Only Chat & Slow Mode "
// //         }

// //         return ""
// //     }, [isDelay, isFollowersOnly])

// //     // Returning null if neither isDelay nor isFollowersOnly are true.
// //     if (!isDelay && !isFollowersOnly) {
// //         return null
// //     }
// //     // Rendering the ChatInfo component.
// //     return (
// //         <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
// //             {/* Hint component wrapping the Info icon, passing the computed hint as label */}
// //             <Hint label={hint}>
// //                 <Info className="h-4 w-4" />
// //             </Hint>
// //             {/* Displaying the computed label */}
// //             <p className="text-xs font-semibold">
// //                 {label}
// //             </p>
// //         </div>
// //     );
// // }

