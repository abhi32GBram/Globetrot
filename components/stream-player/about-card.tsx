"use client"

import React from 'react'
import { VerifiedMark } from '@/components/verified-mark'
import { BioModal } from './bio-modal'

interface AboutCardProps {
    hostName: string
    hostIdentity: string
    viewerIdentity: string
    bio: string | null
    followedByCount: number
}
export const AboutCard = ({ hostIdentity, hostName, viewerIdentity, bio, followedByCount }: AboutCardProps) => {

    const hostAsViewer = `host-${hostIdentity}`

    const isHost = viewerIdentity === hostAsViewer

    const followedByLabel = followedByCount === 1 ? "Follower" : "Followers"


    return (
        <div className='px-4'>
            <div className='group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-2 font-semibold text-lg lg:text-2xl'>
                        About {hostName}
                        <VerifiedMark />
                    </div>
                    {isHost && (
                        <BioModal initialValue={bio} />
                    )}
                </div>
                <div className='text-sm text-muted-foreground'>
                    <span className='font-semibold text-primary'> {followedByCount} </span>  {followedByLabel}
                </div>
                <p className='text-sm font-semibold'>
                    {bio || "A Veil of Secrecy Shrouds this Trottor... "}
                </p>
            </div>
        </div>
    )
}

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================


// // // Import necessary components and libraries
// // import React from 'react'
// // import { VerifiedMark } from '@/components/verified-mark' // Import a component to display a verified mark
// // import { BioModal } from './bio-modal' // Import a modal component for editing bio

// // // Define the props structure for the AboutCard component
// // interface AboutCardProps {
// //     hostName: string
// //     hostIdentity: string
// //     viewerIdentity: string
// //     bio: string | null
// //     followedByCount: number
// // }

// // // Define the AboutCard functional component with destructured props
// // export const AboutCard = ({ hostIdentity, hostName, viewerIdentity, bio, followedByCount }: AboutCardProps) => {

// //     // Combine host identity with a prefix to form a unique identifier
// //     const hostAsViewer = `host-${hostIdentity}`

// //     // Determine if the current viewer is the host
// //     const isHost = viewerIdentity === hostAsViewer

// //     // Decide the label for the follower count based on its value
// //     const followedByLabel = followedByCount === 1 ? "Follower" : "Followers"

// //     // Render the AboutCard component
// //     return (
// //         <div className='px-4'>
// //             {/* Card container with styling */}
// //             <div className='group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3'>
// //                 {/* Header section of the card */}
// //                 <div className='flex items-center justify-between'>
// //                     {/* Host name and verified mark */}
// //                     <div className='flex items-center gap-x-2 font-semibold text-lg lg:text-2xl'>
// //                         About {hostName}
// //                         <VerifiedMark />
// //                     </div>
// //                     {/* Display BioModal for editing bio if viewer is the host */}
// //                     {isHost && (
// //                         <BioModal initialValue={bio} />
// //                     )}
// //                 </div>
// //                 {/* Follower count display */}
// //                 <div className='text-sm text-muted-foreground'>
// //                     <span className='font-semibold text-primary'> {followedByCount} </span>  {followedByLabel}
// //                 </div>
// //                 {/* Bio section */}
// //                 <p className='text-sm font-semibold'>
// //                     {bio || "A Veil of Secrecy Shrouds this Trottor... "}
// //                 </p>
// //             </div>
// //         </div>
// //     )
// // }
