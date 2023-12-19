import { getSelf } from "./auth-service";
import { db } from "./db";

export const getStreams = async () => {
    let userId

    try {
        const self = await getSelf()
        userId = self.id

    } catch {

        userId = null
    }

    let streams = []

    if (userId) {

        streams = await db.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId
                            }
                        }
                    }
                }
            },
            select: {
                id: true,
                user: true,
                isLive: true,
                name: true,
                thumbnailUrl: true
            },
            orderBy: [
                {
                    isLive: "desc"
                },
                {
                    updatedAt: "desc"
                }
            ]
        })

    } else {
        streams = await db.stream.findMany({
            select: {
                id: true,
                user: true,
                isLive: true,
                name: true,
                thumbnailUrl: true
            },
            orderBy: [
                {
                    isLive: "desc"
                },
                {
                    updatedAt: "desc"
                }
            ]
        })
    }
    return streams
}

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================

// // // Import necessary functions and libraries
// // import { getSelf } from "./auth-service"; // Function to get the current user's information
// // import { db } from "./db"; // Database instance for operations

// // // Define the getStreams function as an asynchronous function
// // export const getStreams = async () => {
// //     let userId; // Variable to store the user ID

// //     try {
// //         // Attempt to get the current user's information
// //         const self = await getSelf();
// //         userId = self.id; // Set userId to the id of the current user
// //     } catch {
// //         // If there's an error (e.g., user not logged in), set userId to null
// //         userId = null;
// //     }

// //     let streams = []; // Array to hold the streams

// //     // Check if userId is available (i.e., user is logged in)
// //     if (userId) {
// //         // Fetch streams, excluding those from users who have blocked the current user
// //         streams = await db.stream.findMany({
// //             where: {
// //                 user: {
// //                     NOT: {
// //                         blocking: {
// //                             some: {
// //                                 blockedId: userId // Exclude streams from users who have blocked the current user
// //                             }
// //                         }
// //                     }
// //                 }
// //             },
// //             select: {
// //                 id: true, // Select stream id
// //                 user: true, // Select user information
// //                 isLive: true, // Select live status
// //                 name: true, // Select stream name
// //                 thumbnailUrl: true // Select thumbnail URL
// //             },
// //             orderBy: [
// //                 {
// //                     isLive: "desc" // Order by live status (live streams first)
// //                 },
// //                 {
// //                     updatedAt: "desc" // Then order by updated time (newest first)
// //                 }
// //             ]
// //         });
// //     } else {
// //         // If userId is not available, fetch all streams without excluding any
// //         streams = await db.stream.findMany({
// //             select: {
// //                 id: true, // Select stream id
// //                 user: true, // Select user information
// //                 isLive: true, // Select live status
// //                 name: true, // Select stream name
// //                 thumbnailUrl: true // Select thumbnail URL
// //             },
// //             orderBy: [
// //                 {
// //                     isLive: "desc" // Order by live status (live streams first)
// //                 },
// //                 {
// //                     updatedAt: "desc" // Then order by updated time (newest first)
// //                 }
// //             ]
// //         });
// //     }

// //     // Return the fetched streams
// //     return streams;
// // }
