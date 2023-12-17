"use client"

import { useTransition } from "react"

import { toast } from "sonner"
import { Hint } from "@/components/hint"
import { MinusCircle } from "lucide-react"

import { onBlock } from "@/actions/block"
import { cn, stringToColor } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import React from 'react'

interface CommunityItemProps {
    hostName: string
    viewerName: string
    participantName?: string
    participantIdentity: string
}
export const CommunityItem = ({ hostName, viewerName, participantIdentity, participantName }: CommunityItemProps) => {

    const [isPending, startTransition] = useTransition()
    const isSelf = participantName === viewerName
    const isHost = participantName === hostName

    const color = stringToColor(participantName || "")

    const handleBlock = () => {
        if (!participantName || isSelf || !isHost) return

        startTransition(() => {
            onBlock(participantIdentity)
                .then(() => toast.success(`Blocked ${participantName}`))
                .catch(() => toast.error("Something went wrong"));
        });
    }

    return (
        <div className={cn(
            "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
            isPending && "opacity-50 pointer-events-none"
        )}>
            <p style={{ color: color }}>
                {participantName}
            </p>
            {isHost && !isSelf && (
                <Hint label="Block">
                    <Button className="h-auto w-auto  p-1 opacity-0 group-hover:opacity-100 transition" onClick={handleBlock} disabled={isPending} variant="ghost">
                        <MinusCircle className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </Hint>
            )}
        </div>
    )
}

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================


// // // Importing hooks and components from React and other libraries.
// // import { useTransition } from "react"
// // import { toast } from "sonner"
// // import { Hint } from "@/components/hint"
// // import { MinusCircle } from "lucide-react"
// // import { onBlock } from "@/actions/block"
// // import { cn, stringToColor } from "@/lib/utils"
// // import { Button } from "@/components/ui/button"
// // import React from 'react'

// // // Defining the structure of the props for the CommunityItem component.
// // interface CommunityItemProps {
// //     hostName: string
// //     viewerName: string
// //     participantName?: string
// //     participantIdentity: string
// // }

// // // Exporting the CommunityItem functional component, destructuring its props.
// // export const CommunityItem = ({ hostName, viewerName, participantIdentity, participantName }: CommunityItemProps) => {
// //     // Using the useTransition hook for managing state transitions.
// //     const [isPending, startTransition] = useTransition()
// //     // Determining if the participant is the viewer or the host.
// //     const isSelf = participantName === viewerName
// //     const isHost = participantName === hostName

// //     // Generating a color based on the participant's name.
// //     const color = stringToColor(participantName || "")

// //     // Function to handle the blocking of a participant.
// //     const handleBlock = () => {
// //         // Conditions to prevent blocking if the participant is the viewer or host.
// //         if (!participantName || isSelf || !isHost) return

// //         // Starting a transition for the blocking action.
// //         startTransition(() => {
// //             onBlock(participantIdentity)
// //                 .then(() => toast.success(`Blocked ${participantName}`)) // Showing a success toast message.
// //                 .catch(() => toast.error("Something went wrong")); // Showing an error toast message.
// //         });
// //     }

// //     // Rendering the CommunityItem component.
// //     return (
// //         <div className={cn(
// //             "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
// //             isPending && "opacity-50 pointer-events-none" // Conditional styling for pending state.
// //         )}>
// //             <p style={{ color: color }}>
// //                 {participantName}
// //             </p>
// //             {/* Conditional rendering of the block button for hosts and non-self participants. */}
// //             {isHost && !isSelf && (
// //                 <Hint label="Block">
// //                     <Button className="h-auto w-auto  p-1 opacity-0 group-hover:opacity-100 transition" onClick={handleBlock} disabled={isPending} variant="ghost">
// //                         <MinusCircle className="h-4 w-4 text-muted-foreground" />
// //                     </Button>
// //                 </Hint>
// //             )}
// //         </div>
// //     )
// // }



