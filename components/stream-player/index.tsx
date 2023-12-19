"use client"

import { LiveKitRoom } from "@livekit/components-react";
import { useViewerToken } from '@/hooks/use-viewer-token';

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";

import { Stream, User } from '@prisma/client';

import { Video, VideoSkeleton } from "./video";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";

type CustomStream = {
    id: string
    isLive: boolean
    isChatDelay: boolean
    isChatEnabled: boolean
    isChatFollowersOnly: boolean
    thumbnailUrl: string | null
    name: string
}

type CustomerUser = {
    id: string
    username: string
    bio: string | null
    stream: CustomStream | null
    imageUrl: string
    _count: { followedBy: number }
}


interface StreamPlayerProps {
    user: CustomerUser
    stream: CustomStream;
    isFollowing: boolean;
}

export const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
    const { token, name, identity } = useViewerToken(user.id);

    const { collapsed } = useChatSidebar()

    if (!token || !name || !identity) {
        return (
            <div>
                return <StreamPlayerSkeleton />
            </div>
        );
    }

    return (
        <>
            {collapsed && (
                <div className="hidden lg:block fixed top-[100px] right-2 z-50">
                    <ChatToggle />
                </div>
            )}
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                className={cn(
                    "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
                    collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
                )}>
                <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                    <Video hostName={user.username} hostIdentity={user.id} />
                    <Header
                        hostName={user.username}
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        imageUrl={user.imageUrl}
                        isFollowing={isFollowing}
                        name={stream.name}
                    />

                    <InfoCard
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        name={stream.name}
                        thumbnailUrl={stream.thumbnailUrl}
                    />

                    <AboutCard
                        hostName={user.username}
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        bio={user.bio}
                        followedByCount={user._count.followedBy}
                    />

                </div>
                <div className={cn(
                    "col-span-1",
                    collapsed && "hidden")}>
                    <Chat
                        viewerName={name}
                        hostName={user.username}
                        hostIdentity={user.id}
                        isFollowing={isFollowing}

                        isChatEnabled={stream.isChatEnabled}
                        isChatDelay={stream.isChatDelay}
                        isChatFollowersOnly={stream.isChatFollowersOnly} />

                </div>
            </LiveKitRoom>
        </>
    );
};

import React, { use } from 'react'
import { Header, HeaderSkeleton } from "./header";
import { InfoCard } from "./info-card";
import { AboutCard } from "./about-card";

export const StreamPlayerSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                <VideoSkeleton />
                <HeaderSkeleton />
            </div>
            <div className="col-span-1 bg-background">
                <ChatSkeleton />
            </div>
        </div>
    )
}


// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================

// // // Importing necessary modules and components
// // import { LiveKitRoom } from "@livekit/components-react"; // Component for LiveKit room
// // import { useViewerToken } from '@/hooks/use-viewer-token'; // Hook to get viewer token

// // import { useChatSidebar } from "@/store/use-chat-sidebar"; // State management hook for chat sidebar
// // import { cn } from "@/lib/utils"; // Utility function for conditional class names

// // import { Stream, User } from '@prisma/client'; // Prisma models for Stream and User

// // import { Video, VideoSkeleton } from "./video"; // Video component and its skeleton
// // import { Chat, ChatSkeleton } from "./chat"; // Chat component and its skeleton
// // import { ChatToggle } from "./chat-toggle"; // Chat toggle component
// // import { Skeleton } from "@/components/ui/skeleton"; // Skeleton component for loading states

// // // Interface for StreamPlayerProps
// // interface StreamPlayerProps {
// //     user: User & { stream: Stream | null }; // User object with nested stream object
// //     stream: Stream; // Stream object
// //     isFollowing: boolean; // Boolean to check if the viewer is following
// // }

// // // The StreamPlayer component
// // export const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
// //     const { token, name, identity } = useViewerToken(user.id); // Get viewer token and details

// //     const { collapsed } = useChatSidebar() // State of the chat sidebar

// //     // Conditional rendering based on token and identity availability
// //     if (!token || !name || !identity) {
// //         return (
// //             <div>
// //                 <StreamPlayerSkeleton /> // Render skeleton if token or identity is missing
// //             </div>
// //         );
// //     }

// //     // Main component rendering
// //     return (
// //         <>
// //             {collapsed && (
// //                 <div className="hidden lg:block fixed top-[100px] right-2 z-50">
// //                     <ChatToggle /> // Chat toggle button for large screens
// //                 </div>
// //             )}
// //             <LiveKitRoom
// //                 token={token}
// //                 serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
// //                 className={cn(
// //                     // Conditional classes based on chat sidebar state
// //                     "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
// //                     collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
// //                 )}>
// //                 <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
// //                     <Video hostName={user.username} hostIdentity={user.id} /> // Video component
// //                     <Header
// //                         hostName={user.username}
// //                         hostIdentity={user.id}
// //                         viewerIdentity={identity}
// //                         imageUrl={user.imageUrl}
// //                         isFollowing={isFollowing}
// //                         name={stream.name} /> // Header component
// //                 </div>
// //                 <div className={cn(
// //                     "col-span-1",
// //                     collapsed && "hidden")}>
// //                     <Chat
// //                         viewerName={name}
// //                         hostName={user.username}
// //                         hostIdentity={user.id}
// //                         isFollowing={isFollowing}
// //                         isChatEnabled={stream.isChatEnabled}
// //                         isChatDelay={stream.isChatDelay}
// //                         isChatFollowersOnly={stream.isChatFollowersOnly} /> // Chat component
// //                 </div>
// //             </LiveKitRoom>
// //         </>
// //     );
// // };

// // // Import React and Header components
// // import React, { use } from 'react'
// // import { Header, HeaderSkeleton } from "./header";

// // // StreamPlayerSkeleton component for loading state
// // export const StreamPlayerSkeleton = () => {
// //     return (
// //         <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
// //             <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
// //                 <VideoSkeleton /> // Skeleton for Video component
// //                 <HeaderSkeleton /> // Skeleton for Header component
// //             </div>
// //             <div className="col-span-1 bg-background">
// //                 <ChatSkeleton /> // Skeleton for Chat component
// //             </div>
// //         </div>
// //     )
// // }
