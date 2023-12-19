import { db } from "@/lib/db";
import { getSelf } from "./auth-service";

export const getSearch = async (term?: string) => {
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
                },
                OR: [
                    {
                        name: {
                            contains: term
                        }
                    },
                    {
                        user: {
                            username: {
                                contains: term
                            }
                        }
                    }
                ]
            },
            select: {
                user: true,
                id: true,
                name: true,
                isLive: true,
                thumbnailUrl: true,
                updatedAt: true,
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
            where: {
                OR: [
                    {
                        name: {
                            contains: term
                        }
                    },
                    {
                        user: {
                            username: {
                                contains: term
                            }
                        }
                    }
                ]
            },
            select: {
                user: true,
                id: true,
                name: true,
                isLive: true,
                thumbnailUrl: true,
                updatedAt: true,
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


// // // Importing the database instance from a shared module.
// // import { db } from "@/lib/db";

// // // Importing the getSelf function from the auth-service module.
// // import { getSelf } from "./auth-service";

// // // Exporting an asynchronous function `getSearch` which optionally takes a search term.
// // export const getSearch = async (term?: string) => {
// //     // Initializing a variable to hold the user's ID.
// //     let userId

// //     try {
// //         // Attempting to get the current user's details.
// //         const self = await getSelf()
// //         // Extracting the user ID from the obtained details.
// //         userId = self.id

// //     } catch {
// //         // In case of any errors (e.g., user not found), setting userId to null.
// //         userId = null
// //     }

// //     // Initializing an array to hold the stream results.
// //     let streams = []

// //     // Checking if the user ID is available (not null).
// //     if (userId) {
// //         // If user ID exists, querying the database for streams.
// //         streams = await db.stream.findMany({
// //             where: {
// //                 // Filtering streams where the user is not blocking the current user.
// //                 user: {
// //                     NOT: {
// //                         blocking: {
// //                             some: {
// //                                 blockedId: userId
// //                             }
// //                         }
// //                     }
// //                 },
// //                 // Applying search conditions on stream name or username.
// //                 OR: [
// //                     {
// //                         name: {
// //                             contains: term
// //                         }
// //                     },
// //                     {
// //                         user: {
// //                             username: {
// //                                 contains: term
// //                             }
// //                         }
// //                     }
// //                 ]
// //             },
// //             // Including user details in the response.
// //             include: {
// //                 user: true
// //             },
// //             // Sorting the results first by live status (descending) and then by update time (descending).
// //             orderBy: [
// //                 {
// //                     isLive: "desc"
// //                 },
// //                 {
// //                     updatedAt: "desc"
// //                 }
// //             ]
// //         })

// //     } else {
// //         // If no user ID is found, querying the database without the user blocking condition.
// //         streams = await db.stream.findMany({
// //             where: {
// //                 // Applying search conditions on stream name or username.
// //                 OR: [
// //                     {
// //                         name: {
// //                             contains: term
// //                         }
// //                     },
// //                     {
// //                         user: {
// //                             username: {
// //                                 contains: term
// //                             }
// //                         }
// //                     }
// //                 ]
// //             },
// //             // Including user details in the response.
// //             include: {
// //                 user: true
// //             },
// //             // Sorting the results first by live status (descending) and then by update time (descending).
// //             orderBy: [
// //                 {
// //                     isLive: "desc"
// //                 },
// //                 {
// //                     updatedAt: "desc"
// //                 }
// //             ]
// //         })
// //     }

// //     // Returning the streams array as the function result.
// //     return streams
// // }
