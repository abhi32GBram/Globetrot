import { getStreams } from '@/lib/feed-service'
import React from 'react'
import { ResultCard, ResultCardSkeleton } from './result-card'
import { Skeleton } from '@/components/ui/skeleton'

export const Results = async () => {

    const data = await getStreams()
    return (
        <div>
            <h1 className='text-2xl font-semibold mb-4'>
                Streams We Think You Will Like !!
            </h1>

            {data.length === 0 && (
                <div className=' text-muted-foreground text-sm'>
                    No Stream Found...
                </div>
            )}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
                {data.map((result) => (
                    <ResultCard key={result.id} data={result} />
                ))}
            </div>
        </div>
    )
}

export const ResultsSkeleton = () => {
    return (
        <div>
            <Skeleton className="h-8 w-[290px] mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {[...Array(4)].map((_, i) => (
                    <ResultCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
};

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================

// // // Import necessary functions, libraries, and components
// // import { getStreams } from '@/lib/feed-service' // Function to fetch streams
// // import React from 'react' // React library
// // import { ResultCard, ResultCardSkeleton } from './result-card' // Components for displaying results and their skeletons
// // import { Skeleton } from '@/components/ui/skeleton' // Component for a loading skeleton

// // // Define the Results functional component as an asynchronous function
// // export const Results = async () => {
// //     // Fetch stream data
// //     const data = await getStreams()

// //     // Render the Results component
// //     return (
// //         <div>
// //             {/* Heading for the section */}
// //             <h2 className='text-lg font-semibold mb-4'>
// //                 Streams We Think You Will Like !!
// //             </h2>

// //             {/* Display message if no streams are found */}
// //             {data.length === 0 && (
// //                 <div className='text-muted-foreground text-sm'>
// //                     No Stream Found...
// //                 </div>
// //             )}

// //             {/* Grid layout for displaying stream cards */}
// //             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
// //                 {/* Map each stream data to a ResultCard */}
// //                 {data.map((result) => (
// //                     <ResultCard key={result.id} data={result} />
// //                 ))}
// //             </div>
// //         </div>
// //     )
// // }

// // // Define the ResultsSkeleton functional component for the loading state
// // export const ResultsSkeleton = () => {
// //     return (
// //         // Container for the skeleton layout
// //         <div>
// //             {/* Skeleton for the heading */}
// //             <Skeleton className="h-8 w-[290px] mb-4" />

// //             {/* Grid layout for skeleton cards */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
// //                 {/* Generate a set of ResultCardSkeletons for the placeholder */}
// //                 {[...Array(4)].map((_, i) => (
// //                     <ResultCardSkeleton key={i} />
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // };
