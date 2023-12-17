"use client"

import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'
import { ConnectionState } from "livekit-client"
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react'
import { useMediaQuery } from 'usehooks-ts'
import { useEffect, useMemo, useState } from 'react'
import { ChatHeader, ChatHeaderSkeleton } from './chat-header'
import { ChatForm, ChatFormSkeleton } from './chat-form'
import { ChatList, ChatListSkeleton } from './chat-list'
import { ChatCommunity } from './chat-community'


interface ChatProps {
    hostName: string
    hostIdentity: string
    viewerName: string

    isFollowing: boolean
    isChatEnabled: boolean
    isChatDelay: boolean
    isChatFollowersOnly: boolean
}

export const Chat = ({ hostName, hostIdentity, viewerName, isFollowing, isChatEnabled, isChatDelay, isChatFollowersOnly }: ChatProps) => {

    const matches = useMediaQuery(('max-width:1024px'))
    const { variant, onExpand } = useChatSidebar((state) => state)
    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostIdentity)

    const isOnline = participant && connectionState === ConnectionState.Connected

    const isHidden = !isChatEnabled || !isOnline

    const [value, setValue] = useState("")

    const { chatMessages: messages, send } = useChat()

    useEffect(() => {
        if (matches) {
            onExpand()
        }
    }, [matches, onExpand])


    const reversedMessages = useMemo(() => {
        return messages.sort((a, b) => b.timestamp - a.timestamp)
    }, [messages])

    const onSubmit = () => {
        if (!send) return
        send(value)
        setValue("")
    }

    const onChange = (value: string) => {
        setValue(value)
    }

    return (
        <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                    <ChatList messages={reversedMessages} isHidden={isHidden} />
                    <ChatForm
                        onSubmit={onSubmit}
                        value={value}
                        onChange={onChange}
                        isHidden={isHidden}
                        isFollowersOnly={isChatFollowersOnly}
                        isDelay={isChatDelay}
                        isFollowing={isFollowing}
                    />
                </>
            )}
            {variant === ChatVariant.COMMUNITY && (
                <ChatCommunity viewerName={viewerName} hostName={hostName} isHidden={isHidden} />
            )}
        </div>
    );
}




export const ChatSkeleton = () => {
    return (
        <div className='flex flex-col border-l  border-b pt-0 h-[calc(100vh-80px)] border-2'>
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    )
}


// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================

// // // Importing various hooks and components from different sources.
// // import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'
// // import { ConnectionState } from "livekit-client"
// // import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react'
// // import { useMediaQuery } from 'usehooks-ts'
// // import { useEffect, useMemo, useState } from 'react'
// // import { ChatHeader } from './chat-header'
// // import { ChatForm } from './chat-form'
// // import { ChatList } from './chat-list'

// // // Defining the structure of the props for the Chat component.
// // interface ChatProps {
// //     hostName: string
// //     hostIdentity: string
// //     viewerName: string

// //     isFollowing: boolean
// //     isChatEnabled: boolean
// //     isChatDelay: boolean
// //     isChatFollowersOnly: boolean
// // }

// // // Exporting the Chat component with destructured props.
// // export const Chat = ({ hostName, hostIdentity, viewerName, isFollowing, isChatEnabled, isChatDelay, isChatFollowersOnly }: ChatProps) => {

// //     // Using a media query hook to detect screen width.
// //     const matches = useMediaQuery(('max-width:1024px'))
// //     // Accessing the chat sidebar state and methods.
// //     const { variant, onExpand } = useChatSidebar((state) => state)
// //     // Getting the connection state from the livekit.
// //     const connectionState = useConnectionState()
// //     // Fetching the remote participant based on host identity.
// //     const participant = useRemoteParticipant(hostIdentity)

// //     // Determining if the host is online.
// //     const isOnline = participant && connectionState === ConnectionState.Connected

// //     // Determining if the chat should be hidden based on chat enabled state and host's online status.
// //     const isHidden = !isChatEnabled || !isOnline

// //     // State hook for managing chat input value.
// //     const [value, setValue] = useState("")

// //     // Accessing chat messages and send function from the livekit.
// //     const { chatMessages: messages, send } = useChat()

// //     // Expanding the sidebar when the screen width matches the query.
// //     useEffect(() => {
// //         if (matches) {
// //             onExpand()
// //         }
// //     }, [matches, onExpand])

// //     // Sorting messages in reverse chronological order.
// //     const reversedMessages = useMemo(() => {
// //         return messages.sort((a, b) => b.timestamp - a.timestamp)
// //     }, [messages])

// //     // Function to handle chat submission.
// //     const onSubmit = () => {
// //         if (!send) return
// //         send(value)
// //         setValue("")
// //     }

// //     // Function to handle changes in the chat input.
// //     const onChange = (value: string) => {
// //         setValue(value)
// //     }

// //     // Rendering the chat component.
// //     return (
// //         <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
// //             <ChatHeader />
// //             {/* Conditional rendering based on the variant state. */}
// //             {variant === ChatVariant.CHAT && (
// //                 <>
// //                     <ChatList messages={reversedMessages} isHidden={isHidden}/>
// //                     <ChatForm
// //                         onSubmit={onSubmit}
// //                         value={value}
// //                         onChange={onChange}
// //                         isHidden={isHidden}
// //                         isFollowersOnly={isChatFollowersOnly}
// //                         isDelay={isChatDelay}
// //                         isFollowing={isFollowing}
// //                     />
// //                 </>
// //             )}
// //             {/* Rendering a placeholder text for the COMMUNITY variant. */}
// //             {variant === ChatVariant.COMMUNITY && (
// //                 <p>
// //                     CCOMMMUU
// //                 </p>
// //             )}
// //         </div>
// //     );
// // }
