interface ThumbnailProps {
    src: string | null
    fallback: string
    isLive: boolean
    username: string
}

import React from 'react'
import { UserAvatar } from '@/components/user-avatar'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'


export const Thumbnail = ({ src, fallback, isLive, username }: ThumbnailProps) => {

    let content
    if (!src) {
        content = (
            <div className='bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md'>
                <UserAvatar
                    size="lg"
                    showBadge
                    isLive={isLive}
                    username={username}
                    imageUrl={fallback} />
            </div>
        )
    } else {
        content = (
            <Image
                src={src}
                fill
                alt="Thumbnail"
                className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
            />
        )
    }
    return (
        <div className='group aspect-video relative rounded-md cursor-pointer'>
            <div className=' rounded-md absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center '>
            </div>
            {content}
        </div>
    )
}


export const ThumbnailSkeleton = () => {
    return (
        <div className=' group aspect-video relative rounded-xl cursor-pointer'>
            <Skeleton className='h-full w-full' />
        </div>

    )
}

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================

// // // Define the props structure for the Thumbnail component
// // interface ThumbnailProps {
// //     src: string | null // Source URL for the thumbnail image
// //     fallback: string // Fallback image URL in case src is null
// //     isLive: boolean // Indicates if the related content is live
// //     username: string // Username associated with the thumbnail
// // }

// // // Import necessary components and libraries
// // import React from 'react'
// // import { UserAvatar } from '@/components/user-avatar' // Component for displaying user avatars
// // import Image from 'next/image' // Next.js Image component for optimized image rendering
// // import { Skeleton } from '@/components/ui/skeleton' // Component for a loading skeleton

// // // Define the Thumbnail functional component
// // export const Thumbnail = ({ src, fallback, isLive, username }: ThumbnailProps) => {
// //     let content // Variable to hold the content to be rendered

// //     // Check if the src prop is provided
// //     if (!src) {
// //         // If src is not provided, use a fallback layout
// //         content = (
// //             <div className='bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md'>
// //                 <UserAvatar
// //                     size="lg" // Large size avatar
// //                     showBadge // Show badge indicating live status
// //                     isLive={isLive}
// //                     username={username}
// //                     imageUrl={fallback} // Use fallback image URL
// //                 />
// //             </div>
// //         )
// //     } else {
// //         // If src is provided, display the image
// //         content = (
// //             <Image
// //                 src={src}
// //                 fill // Fill the container
// //                 alt="Thumbnail"
// //                 className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
// //             />
// //         )
// //     }

// //     // Render the Thumbnail component
// //     return (
// //         <div className='group aspect-video relative rounded-md cursor-pointer'>
// //             {/* Overlay effect on hover */}
// //             <div className=' rounded-md absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center '>
// //             </div>
// //             {content} // Render the determined content
// //         </div>
// //     )
// // }

// // // Define the ThumbnailSkeleton functional component for loading state
// // export const ThumbnailSkeleton = () => {
// //     return (
// //         // Skeleton container with aspect ratio and rounded corners
// //         <div className='group aspect-video relative rounded-xl cursor-pointer'>
// //             {/* Skeleton covering the whole area */}
// //             <Skeleton className='h-full w-full' />
// //         </div>
// //     )
// // }
