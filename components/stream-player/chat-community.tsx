"use client"

import { useParticipants } from '@livekit/components-react'
import { LocalParticipant, RemoteParticipant } from 'livekit-client'

import React, { useMemo, useState } from 'react'

import { useDebounce } from 'usehooks-ts'

import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CommunityItem } from './community-item'

interface ChatCommunityProps {
    hostName: string
    viewerName: string
    isHidden: boolean
}


export const ChatCommunity = ({ hostName, viewerName, isHidden }: ChatCommunityProps) => {

    const [value, setValue] = useState("")

    const debounceValue = useDebounce<string>(value, 500)
    const participants = useParticipants()

    const onChange = (newValue: string) => {
        setValue(newValue)
    }

    const filteredParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`

            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant)
            }
            return acc
        }, [] as (RemoteParticipant | LocalParticipant)[])

        return deduped.filter((participant) => {
            return participant.name?.toLowerCase().includes(debounceValue.toLowerCase())
        })

    }, [participants, debounceValue])

    if (isHidden) {
        <div className='flex flex-1 items-center justify-center '>
            <p className='text-sm text-muted-foreground '>
                Community Section is Disabled
            </p>
        </div>
    }

    return (
        <div className='p-4'>
            <Input onChange={(e) => onChange(e.target.value)} placeholder='Search a Trottor' className='border-white/10 border-purple-600' />
            <ScrollArea className='gap-y-2 mt-4 '>
                <p className='text-center text-sm text-muted-foreground hidden last:block p-2'>
                    No Results Found
                </p>
                {filteredParticipants.map((participant) => (
                    <CommunityItem
                        key={participant.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participant.name}
                        participantIdentity={participant.identity} />
                ))}
            </ScrollArea>
        </div>
    )
}
// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================


// // // Importing hooks and types from different libraries.
// // import { useParticipants } from '@livekit/components-react'
// // import { LocalParticipant, RemoteParticipant } from 'livekit-client'
// // import React, { useMemo, useState } from 'react'
// // import { useDebounce } from 'usehooks-ts'
// // import { Input } from '@/components/ui/input'
// // import { ScrollArea } from '@/components/ui/scroll-area'
// // import { CommunityItem } from './community-item'

// // // Defining the structure of the props for the ChatCommunity component.
// // interface ChatCommunityProps {
// //     hostName: string
// //     viewerName: string
// //     isHidden: boolean
// // }

// // // Exporting the ChatCommunity functional component, destructuring its props.
// // export const ChatCommunity = ({ hostName, viewerName, isHidden }: ChatCommunityProps) => {
// //     // State for managing the input value.
// //     const [value, setValue] = useState("")

// //     // Using debounce to delay the update of the value.
// //     const debounceValue = useDebounce<string>(value, 500)
// //     // Fetching the participants from the livekit.
// //     const participants = useParticipants()

// //     // Function to handle changes in the input field.
// //     const onChange = (newValue: string) => {
// //         setValue(newValue)
// //     }
// // --------------------------------------------------------------------------------------------
// //    // This custom hook filters the list of participants based on two criteria:

// // 1. Deduplication of host participants: It prevents displaying both the
// //    local host participant and the virtual "host-<identity>" participant.
// // 2. Search matching: It filters participants based on the debounced search value.

// const filteredParticipants = useMemo(() => {
//     // Create an empty accumulator array to store participants.
//     const deduped: (RemoteParticipant | LocalParticipant)[] = [];

//     // Loop through each participant in the original list.
//     participants.forEach((participant) => {
//       // Construct the virtual "host-<identity>" identifier for the host participant.
//       const hostAsViewer = `host-${participant.identity}`;

//       // Check if the accumulator already contains a participant with the same identity
//       // as the constructed virtual host participant.
//       const duplicateExists = deduped.some((p) => p.identity === hostAsViewer);

//       // If a duplicate host participant doesn't exist, add the original participant
//       // to the accumulator.
//       if (!duplicateExists) {
//         deduped.push(participant);
//       }
//     });



//     // Return the filtered participants based on the search value.
//     return deduped.filter((participant) => {
//       // Convert both participant name and search value to lowercase for case-insensitive search.
//       const loweredName = participant.name?.toLowerCase();
//       const loweredSearch = debounceValue.toLowerCase();

//       // Check if the lowercase participant name includes the lowercase search value.
//       return loweredName && loweredName.includes(loweredSearch);
//     });
//   }, [participants, debounceValue]);

//   // This hook will re-calculate the filtered participants whenever the list of participants
//   // or the search value changes.

// // --------------------------------------------------------------------------------------------
// //     // Conditional rendering if the community section is hidden.
// //     if (isHidden) {
// //         <div className='flex flex-1 items-center justify-center '>
// //             <p className='text-sm text-muted-foreground '>
// //                 Community Section is Disabled
// //             </p>
// //         </div>
// //     }

// //     // Rendering the ChatCommunity component.
// //     return (
// //         <div className='p-4'>
// //             <Input onChange={(e) => onChange(e.target.value)} placeholder='Search a Trottor' className='border-white/10 border-purple-600' />
// //             <ScrollArea className='gap-y-2 mt-4 '>
// //                 <p className='text-center text-sm text-muted-foreground hidden last:block p-2'>
// //                     No Results Found
// //                 </p>
// //                 {filteredParticipants.map((participant) => (
// //                     <CommunityItem
// //                         key={participant.identity}
// //                         hostName={hostName}
// //                         viewerName={viewerName}
// //                         participantName={participant.name}
// //                         participantIdentity={participant.identity} />
// //                 ))}
// //             </ScrollArea>
// //         </div>
// //     )
// // }
