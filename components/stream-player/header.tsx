"use client";

import { UserIcon } from "lucide-react";
import { useParticipants, useRemoteParticipant } from "@livekit/components-react";

import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedMark } from "@/components/verified-mark";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { Actions } from "./actions";


interface HeaderProps {
    imageUrl: string;
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    isFollowing: boolean;
    name: string;
};

export const Header = ({ imageUrl, hostName, hostIdentity, viewerIdentity, isFollowing, name, }: HeaderProps) => {

    const participants = useParticipants();
    const participant = useRemoteParticipant(hostIdentity);

    const isLive = !!participant;

    const participantCount = participants.length - 1;

    const hostAsViewer = `host-${hostIdentity}`;

    const isHost = viewerIdentity === hostAsViewer;

    return (
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div className="flex items-center gap-x-3">
                <UserAvatar
                    imageUrl={imageUrl}
                    username={hostName}
                    size="lg"
                    isLive={isLive}
                    showBadge
                />
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <h2 className="text-lg font-semibold">
                            {hostName}
                        </h2>
                        <VerifiedMark />
                    </div>
                    <p className="text-sm font-semibold">
                        {name}
                    </p>
                    {isLive ? (
                        <div className="font-semibold flex gap-x-1 items-center text-xs text-red-500">
                            <UserIcon className="h-4 w-4" />
                            <p>
                                {participantCount} {participantCount === 1 ? "viewer" : "viewers"}
                            </p>
                        </div>
                    ) : (
                        <p className="font-semibold text-xs text-muted-foreground">
                            Offline
                        </p>
                    )}
                </div>
            </div>
            <Actions isFollowing={isFollowing} hostIdentity={hostIdentity} isHost={isHost} />
        </div>
    );
};

export const HeaderSkeleton = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div className="flex items-center gap-x-2">
                <UserAvatarSkeleton size="lg" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
        </div>
    );
};


// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================


// // // Importing necessary components and hooks from various libraries and local files
// // import { UserIcon } from "lucide-react"; // User icon component from lucide-react library
// // import { useParticipants, useRemoteParticipant } from "@livekit/components-react"; // Hooks for participant data from livekit
// // import { Skeleton } from "@/components/ui/skeleton"; // Skeleton component for loading states
// // import { VerifiedMark } from "@/components/verified-mark"; // Component to display a verified mark
// // import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar"; // User avatar components
// // import { Actions } from "./actions"; // Actions component from the current directory

// // // Interface definition for the HeaderProps type
// // interface HeaderProps {
// //     imageUrl: string; // URL of the user's avatar image
// //     hostName: string; // Name of the host
// //     hostIdentity: string; // Unique identity of the host
// //     viewerIdentity: string; // Unique identity of the viewer
// //     isFollowing: boolean; // Whether the viewer is following the host
// //     name: string; // Name of the viewer
// // };

// // // The Header component definition
// // export const Header = ({ imageUrl, hostName, hostIdentity, viewerIdentity, isFollowing, name, }: HeaderProps) => {
// //     const participants = useParticipants(); // Retrieves list of participants from the livekit
// //     const participant = useRemoteParticipant(hostIdentity); // Retrieves specific participant data based on host identity

// //     const isLive = !!participant; // Determines if the host is currently live

// //     const participantCount = participants.length - 1; // Counts the number of participants minus the host

// //     const hostAsViewer = `host-${hostIdentity}`; // Constructing a unique identifier for the host as a viewer

// //     const isHost = viewerIdentity === hostAsViewer; // Checks if the current viewer is the host

// //     // Render the header component with conditional rendering based on the live status and other props
// //     return (
// //         <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
// //             <div className="flex items-center gap-x-3">
// //                 <UserAvatar
// //                     imageUrl={imageUrl}
// //                     username={hostName}
// //                     size="lg"
// //                     isLive={isLive}
// //                     showBadge
// //                 />
// //                 <div className="space-y-1">
// //                     <div className="flex items-center gap-x-2">
// //                         <h2 className="text-lg font-semibold">
// //                             {hostName}
// //                         </h2>
// //                         <VerifiedMark />
// //                     </div>
// //                     <p className="text-sm font-semibold">
// //                         {name}
// //                     </p>
// //                     {isLive ? (
// //                         <div className="font-semibold flex gap-x-1 items-center text-xs text-red-500">
// //                             <UserIcon className="h-4 w-4" />
// //                             <p>
// //                                 {participantCount} {participantCount === 1 ? "viewer" : "viewers"}
// //                             </p>
// //                         </div>
// //                     ) : (
// //                         <p className="font-semibold text-xs text-muted-foreground">
// //                             Offline
// //                         </p>
// //                     )}
// //                 </div>
// //             </div>
// //             <Actions isFollowing={isFollowing} hostIdentity={hostIdentity} isHost={isHost} />
// //         </div>
// //     );
// // };

// // // Skeleton component for the Header component to display during loading
// // export const HeaderSkeleton = () => {
// //     return (
// //         <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
// //             <div className="flex items-center gap-x-2">
// //                 <UserAvatarSkeleton size="lg" />
// //                 <div className="space-y-2">
// //                     <Skeleton className="h-6 w-32" />
// //                     <Skeleton className="h-4 w-24" />
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };
