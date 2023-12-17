"use client"

import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";

interface ChatListProps {
    messages: ReceivedChatMessage[]
    isHidden: boolean
}


export const ChatList = ({ messages, isHidden }: ChatListProps) => {

    if (isHidden || !messages || messages.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center ">
                <p className="text-sm text-muted-foreground">
                    {isHidden ? "Chat is Disabled " : "Welcome !!"}
                </p>
            </div>
        )
    }
    return (
        <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3  h-full">
            {messages.map((message) => (
                <ChatMessage key={message.timestamp} data={message} />
            ))}
        </div>
    )
}

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE 
// // =========================================================================================================================

// // // Importing the ReceivedChatMessage type from "@livekit/components-react" package.
// // import { ReceivedChatMessage } from "@livekit/components-react";
// // // Importing the ChatMessage component from the current directory.
// // import { ChatMessage } from "./chat-message";

// // // Defining the structure of the props for the ChatList component.
// // interface ChatListProps {
// //     messages: ReceivedChatMessage[]
// //     isHidden: boolean
// // }

// // // Exporting the ChatList functional component, destructuring its props.
// // export const ChatList = ({ messages, isHidden }: ChatListProps) => {

// //     // Conditional rendering: If the chat is hidden, or if there are no messages, display a message.
// //     if (isHidden || !messages || messages.length === 0) {
// //         return (
// //             // Centering the message in the container.
// //             <div className="flex flex-1 items-center justify-center ">
// //                 <p className="text-sm text-muted-foreground">
// //                     {/* Showing different messages based on whether the chat is hidden or just empty. */}
// //                     {isHidden ? "Chat is Disabled " : "Welcome !!"}
// //                 </p>
// //             </div>
// //         )
// //     }
// //     // Rendering the chat messages list.
// //     return (
// //         // Container for chat messages with a scrollbar.
// //         <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3  h-full">
// //             {/* Mapping over the messages array to render each message. */}
// //             {messages.map((message) => (
// //                 <ChatMessage key={message.timestamp} data={message} />
// //             ))}
// //         </div>
// //     )
// // }
