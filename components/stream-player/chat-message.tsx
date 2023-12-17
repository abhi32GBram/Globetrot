"use client"

import { stringToColor } from "@/lib/utils"
import { ReceivedChatMessage } from "@livekit/components-react"

import { format } from "date-fns"

interface ChatMessageProps {
    data: ReceivedChatMessage
}


export const ChatMessage = ({ data }: ChatMessageProps) => {

    const color = stringToColor(data.from?.name || "")
    return (
        <div className="flex gap-2 p-2 rounded-md  hover:bg-white/5">
            <p className="text-sm text-white/40">
                {format(data.timestamp, "HH:MM")}
            </p>
            <div className="flex flex-wrap items-baseline grow  gap-1">
                <p className="text-sm font-semibold whitespace-nowrap">
                    <span className="truncate" style={{ color: color }}>
                        {data.from?.name}
                    </span>
                </p>
                <p className="text-sm break-all">
                    {data.message}
                </p>
            </div>
        </div>
    )
}

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================

// // // Importing the utility function 'stringToColor' from a specific path.
// // import { stringToColor } from "@/lib/utils"
// // // Importing the ReceivedChatMessage type from "@livekit/components-react" package.
// // import { ReceivedChatMessage } from "@livekit/components-react"

// // // Importing the 'format' function from 'date-fns' library for date formatting.
// // import { format } from "date-fns"

// // // Defining the structure of the props for the ChatMessage component.
// // interface ChatMessageProps {
// //     data: ReceivedChatMessage
// // }

// // // Exporting the ChatMessage functional component, destructuring its props.
// // export const ChatMessage = ({ data }: ChatMessageProps) => {

// //     // Generating a color based on the sender's name.
// //     const color = stringToColor(data.from?.name || "")
// //     return (
// //         // Defining the structure and styling of a chat message.
// //         <div className="flex gap-2 p-2 rounded-md  hover:bg-white/5">
// //             {/* Formatting and displaying the timestamp of the message. */}
// //             <p className="text-sm text-white/40">
// //                 {format(data.timestamp, "HH:MM")}
// //             </p>
// //             {/* Container for the sender's name and the message text. */}
// //             <div className="flex flex-wrap items-baseline grow  gap-1">
// //                 {/* Displaying the sender's name with the generated color. */}
// //                 <p className="text-sm font-semibold whitespace-nowrap">
// //                     <span className="truncate" style={{ color: color }}>
// //                         {data.from?.name}
// //                     </span>
// //                 </p>
// //                 {/* Displaying the message text. */}
// //                 <p className="text-sm break-all">
// //                     {data.message}
// //                 </p>
// //             </div>
// //         </div>
// //     )
// // }
