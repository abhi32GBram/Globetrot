import { LiveBadge } from "@/components/live-badge";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { Stream, User } from "@prisma/client";

import Link from "next/link";

interface ResultCardProps {
    data: {
        id: string
        user: User
        isLive: boolean
        name: string
        thumbnailUrl: string | null
    }
}

export const ResultCard = ({ data }: ResultCardProps) => {
    return (
        <Link href={`/${data.user.username}`}>
            <div className="h-full w-full space-y-4">
                <Thumbnail src={data.thumbnailUrl} fallback={data.user.imageUrl} isLive={data.isLive} username={data.user.username} />
                {data.isLive && (
                    <div className=" absolute left-2 top-2 group-hover:translate-x-2 group-hover:translate-y-2  transition-transform">
                        <LiveBadge />
                    </div>
                )}
                <div className="flex gap-x-3">
                    <UserAvatar
                        username={data.user.username}
                        imageUrl={data.user.imageUrl}
                        isLive={data.isLive}
                    />
                    <div className="flex flex-col text-sm overflow-hidden">
                        <p className="truncate font-semibol hover:text-purple-500">
                            {data.name}
                        </p>
                        <p className="text-muted-foreground">
                            {data.user.username}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}


export const ResultCardSkeleton = () => {
    return (
        <div className="h-full w-full space-y-4">
            <ThumbnailSkeleton />
            <div className="flex gap-x-3">
                <UserAvatarSkeleton />
                <div className="flex flex-col gap-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
        </div>
    );
};


// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================


// // // Import necessary components and libraries
// // import { LiveBadge } from "@/components/live-badge"; // Component to display a live badge
// // import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail"; // Components for thumbnail and its skeleton
// // import { Skeleton } from "@/components/ui/skeleton"; // Component for loading skeleton
// // import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar"; // Components for user avatar and its skeleton
// // import Link from "next/link"; // Link component from Next.js for navigation

// // // Define the props structure for the ResultCard component
// // interface ResultCardProps {
// //     data: {
// //         id: string
// //         user: User
// //         isLive: boolean
// //         name: string
// //         thumbnailUrl: string | null
// //     }
// // }

// // // Define the ResultCard functional component
// // export const ResultCard = ({ data }: ResultCardProps) => {
// //     return (
// //         // Link wrapper for navigation
// //         <Link href={`/${data.user.username}`}>
// //             {/* Card container with layout and spacing */}
// //             <div className="h-full w-full space-y-4">
// //                 {/* Thumbnail of the user or stream */}
// //                 <Thumbnail src={data.thumbnailUrl} fallback={data.user.imageUrl} isLive={data.isLive} username={data.user.username} />
// //                 {/* Conditionally render the LiveBadge if the stream is live */}
// //                 {data.isLive && (
// //                     <div className=" absolute left-2 top-2 group-hover:translate-x-2 group-hover:translate-y-2  transition-transform">
// //                         <LiveBadge />
// //                     </div>
// //                 )}
// //                 {/* User details section */}
// //                 <div className="flex gap-x-3">
// //                     {/* User avatar with live status indication */}
// //                     <UserAvatar
// //                         username={data.user.username}
// //                         imageUrl={data.user.imageUrl}
// //                         isLive={data.isLive}
// //                     />
// //                     {/* User name and username display */}
// //                     <div className="flex flex-col text-sm overflow-hidden">
// //                         <p className="truncate font-semibol hover:text-purple-500">
// //                             {data.name}
// //                         </p>
// //                         <p className="text-muted-foreground">
// //                             {data.user.username}
// //                         </p>
// //                     </div>
// //                 </div>
// //             </div>
// //         </Link>
// //     )
// // }

// // // Define the ResultCardSkeleton functional component for loading state
// // export const ResultCardSkeleton = () => {
// //     return (
// //         // Skeleton container with layout and spacing
// //         <div className="h-full w-full space-y-4">
// //             {/* Skeleton for the thumbnail */}
// //             <ThumbnailSkeleton />
// //             {/* Skeleton for user avatar and details */}
// //             <div className="flex gap-x-3">
// //                 <UserAvatarSkeleton />
// //                 {/* Skeleton for text elements */}
// //                 <div className="flex flex-col gap-y-1">
// //                     <Skeleton className="h-4 w-32" />
// //                     <Skeleton className="h-3 w-24" />
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };
