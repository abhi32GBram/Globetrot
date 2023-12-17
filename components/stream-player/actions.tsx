"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "../ui/skeleton"
import { Heart } from "lucide-react"

import { cn } from "@/lib/utils"

import { useAuth } from "@clerk/nextjs"

import { useTransition } from "react"
import { useRouter } from "next/navigation"

import { onFollow, onUnfollow } from "@/actions/follow"
import { toast } from "sonner"


interface ActionProps {
    isFollowing: boolean
    hostIdentity: string
    isHost: boolean
}

export const Actions = ({ isFollowing, hostIdentity, isHost }: ActionProps) => {

    const [isPending, startTransition] = useTransition()

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => toast.success(`${data.following.username} Added to Following `))
                .catch(() => toast.error("Something Went Wrong "))
        })
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then((data) => toast.success(`${data.following.username} Removed from Following `))
                .catch(() => toast.error("Something Went Wrong "))
        })
    }

    const { userId } = useAuth()

    const router = useRouter()

    const toggleFollow = () => {
        if (!userId) {
            return router.push("/sign-in")
        }
        if (isHost) return
        if (isFollowing) {
            handleUnFollow()
        } else {
            handleFollow()
        }

    }

    return (
        <Button onClick={toggleFollow} variant="primary" size="sm" className="w-full lg:w-auto" disabled={isPending || isHost}>
            <Heart className={cn(
                "h-4 w-4 mr-2",
                isFollowing ? "fill-white" : "fill-none"
            )} />
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24" />
    )
}

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================


// // // Importing components and utilities from various libraries and local files
// // import { Button } from "@/components/ui/button"; // Button component from a local file
// // import { Skeleton } from "../ui/skeleton"; // Skeleton component for loading states
// // import { Heart } from "lucide-react"; // Heart icon from lucide-react library
// // import { cn } from "@/lib/utils"; // Utility function for conditional classname handling
// // import { useAuth } from "@clerk/nextjs"; // Authentication hook from Clerk
// // import { useTransition } from "react"; // Hook for managing transitions
// // import { useRouter } from "next/navigation"; // Hook for routing in Next.js
// // import { onFollow, onUnfollow } from "@/actions/follow"; // Follow and unfollow actions
// // import { toast } from "sonner"; // Toast notification library

// // // Interface definition for the ActionProps type
// // interface ActionProps {
// //     isFollowing: boolean; // Whether the current user is following the host
// //     hostIdentity: string; // Identity of the host
// //     isHost: boolean; // Whether the current user is the host
// // }

// // // The Actions component definition
// // export const Actions = ({ isFollowing, hostIdentity, isHost }: ActionProps) => {
// //     const [isPending, startTransition] = useTransition(); // Using the useTransition hook for handling state transitions

// //     // Function to handle the follow action
// //     const handleFollow = () => {
// //         startTransition(() => {
// //             onFollow(hostIdentity) // Trigger follow action
// //                 .then((data) => toast.success(`${data.following.username} Added to Following `)) // Show success toast
// //                 .catch(() => toast.error("Something Went Wrong ")); // Show error toast on failure
// //         });
// //     };

// //     // Function to handle the unfollow action
// //     const handleUnFollow = () => {
// //         startTransition(() => {
// //             onUnfollow(hostIdentity) // Trigger unfollow action
// //                 .then((data) => toast.success(`${data.following.username} Removed from Following `)) // Show success toast
// //                 .catch(() => toast.error("Something Went Wrong ")); // Show error toast on failure
// //         });
// //     };

// //     const { userId } = useAuth(); // Get the userId from the authentication hook
// //     const router = useRouter(); // Initialize the router hook for navigation

// //     // Function to toggle follow/unfollow based on current state
// //     const toggleFollow = () => {
// //         if (!userId) { // Check if the user is not logged in
// //             return router.push("/sign-in"); // Redirect to sign-in page
// //         }
// //         if (isHost) return; // Do nothing if the user is the host
// //         if (isFollowing) {
// //             handleUnFollow(); // Call unfollow handler if already following
// //         } else {
// //             handleFollow(); // Call follow handler if not following
// //         }
// //     };

// //     // Return the Button component with appropriate props and children
// //     return (
// //         <Button onClick={toggleFollow} variant="primary" size="sm" className="w-full lg:w-auto" disabled={isPending || isHost}>
// //             <Heart className={cn(
// //                 "h-4 w-4 mr-2",
// //                 isFollowing ? "fill-white" : "fill-none"
// //             )} />
// //             {isFollowing ? "Unfollow" : "Follow"}
// //         </Button>
// //     );
// // };

// // // Component to display a skeleton loader
// // export const ActionsSkeleton = () => {
// //     return (
// //         <Skeleton className="h-10 w-full lg:w-24" /> // Returns a Skeleton component with specified class names
// //     );
// // };
