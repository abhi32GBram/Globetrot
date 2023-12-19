import React from 'react'
import { db } from "@/lib/db"

export const getUserByUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username
        },
        select: {
            id: true,
            externalUserId: true,
            username: true,
            bio: true,
            imageUrl: true,
            stream: {
                select: {
                    id: true,
                    isLive: true,
                    isChatDelay: true,
                    isChatEnabled: true,
                    isChatFollowersOnly: true,
                    thumbnailUrl: true,
                    name: true,
                }
            },
            _count: {
                select: {
                    followedBy: true
                }
            }
        }
    })
    return user
}




export const getUserById = async (id: string) => {
    const user = await db.user.findUnique({
        where: {
            id
        },
        include: {
            stream: true
        }
    })

    return user
}
// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================


// // // Importing the React library.
// // import React from 'react'

// // // Importing the database instance from a shared module.
// // import { db } from "@/lib/db"

// // // Exporting an asynchronous function `getUserByUsername` that takes a username as a parameter.
// // export const getUserByUsername = async (username: string) => {
// //     // Querying the database for a unique user based on the username.
// //     const user = await db.user.findUnique({
// //         where: {
// //             // Specifying the condition to find the user: the username must match.
// //             username
// //         },
// //         select: {
// //             // Selecting specific fields to return in the query result.
// //             id: true,
// //             externalUserId: true,
// //             username: true,
// //             bio: true,
// //             imageUrl: true,
// //             // Including related stream information with specific fields selected.
// //             stream: {
// //                 select: {
// //                     id: true,
// //                     isLive: true,
// //                     isChatDelay: true,
// //                     isChatEnabled: true,
// //                     isChatFollowersOnly: true,
// //                     thumbnailUrl: true,
// //                     name: true,
// //                 }
// //             },
// //             // Including a count of how many users follow this user.
// //             _count: {
// //                 select: {
// //                     followedBy: true
// //                 }
// //             }
// //         }
// //     })
// //     // Returning the user object as the function result.
// //     return user
// // }

// // // Exporting an asynchronous function `getUserById` that takes a user ID as a parameter.
// // export const getUserById = async (id: string) => {
// //     // Querying the database for a unique user based on the ID.
// //     const user = await db.user.findUnique({
// //         where: {
// //             // Specifying the condition to find the user: the ID must match.
// //             id
// //         },
// //         // Including related stream information in its entirety.
// //         include: {
// //             stream: true
// //         }
// //     })

// //     // Returning the user object as the function result.
// //     return user
// // }
