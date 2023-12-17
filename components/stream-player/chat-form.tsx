"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface ChatFormProps {
    onSubmit: () => void
    value: string
    onChange: (value: string) => void

    isHidden: boolean
    isFollowersOnly: boolean
    isDelay: boolean
    isFollowing: boolean
}

import React from 'react'
import { ChatInfo } from "./chat-info"

export const ChatForm = ({ onChange, value, onSubmit, isDelay, isFollowersOnly, isFollowing, isHidden }: ChatFormProps) => {

    const [isDelayBlocked, setIsDelayBlocked] = useState(false)

    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing
    const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (!value || isDisabled) return

        if (isDelay && !isDelayBlocked) {
            setIsDelayBlocked(true)
            setTimeout(() => {
                setIsDelayBlocked(false)
                onSubmit()
            }, 3500)
        } else {
            onSubmit()
        }
    }

    if (isHidden) {
        return null
    }

    return (
        <form className="flex flex-col items-center gap-y-4 p-3" onSubmit={handleSubmit}>
            <div className="w-full">
                <ChatInfo isDelay={isDelay} isFollowersOnly={isFollowersOnly} />
                <Input onChange={(e) => onChange(e.target.value)} value={value} disabled={isDisabled} placeholder="Chat with Trottors"
                    className={cn(
                        "border-white/10",
                        isFollowersOnly && "rounded-t-none border-t-0"
                    )}>
                </Input>
            </div>
            <div className="ml-auto">
                <Button type="submit" variant="primary" disabled={isDisabled} size="sm">
                    Chat
                </Button>
            </div>
        </form>
    )
}

export const ChatFormSkeleton = () => {

    return (
        <div className="flex flex-col items-center  gap-y-4 p-3">
            <Skeleton className="w-full h-10" />
            <div className="flex items-center gap-x-2 ml-auto">
                <Skeleton className="h-7 w-7" />
                <Skeleton className="h-7 w-12" />
            </div>
        </div>
    )
}


// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE 
// // =========================================================================================================================

// // // Importing the useState hook from React for state management.
// // import { useState } from "react"

// // // Importing a utility function 'cn' (commonly used for conditional class names).
// // import { cn } from "@/lib/utils"

// // // Importing UI components from a specific path.
// // import { Input } from "@/components/ui/input"
// // import { Button } from "@/components/ui/button"
// // import { Skeleton } from "@/components/ui/skeleton"

// // // Defining the structure of the props that will be passed to the ChatForm component.
// // interface ChatFormProps {
// //     onSubmit: () => void
// //     value: string
// //     onChange: (value: string) => void

// //     isHidden: boolean
// //     isFollowersOnly: boolean
// //     isDelay: boolean
// //     isFollowing: boolean
// // }

// // // Importing React.
// // import React from 'react'
// // // Importing the ChatInfo component from the same directory.
// // import { ChatInfo } from "./chat-info"

// // // Exporting the ChatForm component, destructuring its props right in the function's parameters.
// // export const ChatForm = ({ onChange, value, onSubmit, isDelay, isFollowersOnly, isFollowing, isHidden }: ChatFormProps) => {

// //     // State hook to manage the delay blocking status.
// //     const [isDelayBlocked, setIsDelayBlocked] = useState(false)

// //     // Logic to determine if the form should be disabled.
// //     const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing
// //     const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing

// //     // Function to handle form submission.
// //     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
// //         e.preventDefault()
// //         e.stopPropagation()

// //         // Prevent submission if the value is empty or the form is disabled.
// //         if (!value || isDisabled) return

// //         // Handle delay before submission if required.
// //         if (isDelay && !isDelayBlocked) {
// //             setIsDelayBlocked(true)
// //             setTimeout(() => {
// //                 setIsDelayBlocked(false)
// //                 onSubmit()
// //             }, 3500)
// //         } else {
// //             onSubmit()
// //         }
// //     }

// //     // Return null to render nothing if the form is hidden.
// //     if (isHidden) {
// //         return null
// //     }

// //     // Render the form.
// //     return (
// //         <form className="flex flex-col items-center gap-y-4 p-3" onSubmit={handleSubmit}>
// //             <div className="w-full">
// //                 <ChatInfo isDelay={isDelay} isFollowersOnly={isFollowersOnly} />
// //                 <Input onChange={(e) => onChange(e.target.value)} value={value} disabled={isDisabled} placeholder="Chat with Trottors"
// //                     className={cn(
// //                         "border-white/10",
// //                         isFollowersOnly && "rounded-t-none border-t-0"
// //                     )}>
// //                 </Input>
// //             </div>
// //             <div className="ml-auto">
// //                 <Button type="submit" variant="primary" disabled={isDisabled} size="sm">
// //                     Chat
// //                 </Button>
// //             </div>
// //         </form>
// //     )
// // }

// // // Exporting a skeleton version of the ChatForm for loading states.
// // export const ChatFormSkeleton = () => {

// //     // Render the skeleton placeholders.
// //     return (
// //         <div className="flex flex-col items-center  gap-y-4 p-3">
// //             <Skeleton className="w-full h-10" />
// //             <div className="flex items-center gap-x-2 ml-auto">
// //                 <Skeleton className="h-7 w-7" />
// //                 <Skeleton className="h-7 w-12" />
// //             </div>
// //         </div>
// //     )
// // }
