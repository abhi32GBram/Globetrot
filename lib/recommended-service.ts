import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
    let userId;
    try {
        const self = await getSelf()
        userId = self.id
    } catch {
        userId = null
    }

    let users = []

    if (userId) {
        users = await db.user.findMany({
            where: {
                AND: [{
                    NOT: {
                        id: userId
                    },
                }, {
                    NOT: {
                        followedBy: {
                            some: {
                                followerId: userId
                            }
                        }
                    }
                }, {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId
                            }
                        }
                    }
                }]
            },
            include: {
                stream: {
                    select: {
                        isLive: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            },
        })
    } else {
        users = await db.user.findMany({
            include: {
                stream: {
                    select: {
                        isLive: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    return users

}

//-------------------------------------------------------------------------------------------------------------------
// WELL COMMENTED COUNTERPART OF THE CODE ABOVE FOR EXPLANAITON WITHOUT BREAKING THE CODE ITSELF

// Import the database instance from a custom path and a function to get current user's details.
// // // import { db } from "@/lib/db";
// // // import { getSelf } from "@/lib/auth-service";

// // // // Define an asynchronous function to get recommended users.
// // // export const getRecommended = async () => {
// // //     let userId;

// // //     // Try to get the current user's details. If an error occurs (e.g., user not logged in), set userId to null.
// // //     try {
// // //         const self = await getSelf();
// // //         userId = self.id;
// // //     } catch {
// // //         userId = null;
// // //     }

// // //     let users = []; // Initialize an array to hold the user data.

// // //     // Check if a valid userId exists.
// // //     if (userId) {
// // //         // Fetch users from the database with specific conditions:
// // //         users = await db.user.findMany({
// // //             where: {
// // //                 AND: [
// // //                     // The user should not be the current user.
// // //                     {
// // //                         NOT: {
// // //                             id: userId
// // //                         },
// // //                     },
// // //                     // The user should not be followed by the current user.
// // //                     {
// // //                         NOT: {
// // //                             followedBy: {
// // //                                 some: {
// // //                                     followerId: userId
// // //                                 }
// // //                             }
// // //                         }
// // //                     },
// // //                     // The user should not be blocking the current user.
// // //                     {
// // //                         NOT: {
// // //                             blocking: {
// // //                                 some: {
// // //                                     blockedId: userId
// // //                                 }
// // //                             }
// // //                         }
// // //                     }
// // //                 ]
// // //             },
// // //             include: {
// // //                 stream: true // Include the user's stream details in the response.
// // //             },
// // //             orderBy: {
// // //                 createdAt: "desc" // Order the users by creation time, newest first.
// // //             },
// // //         });
// // //     } else {
// // //         // If no valid userId, fetch all users without the above conditions.
// // //         users = await db.user.findMany({
// // //             include: {
// // //                 stream: true // Include the user's stream details in the response.
// // //             },
// // //             orderBy: {
// // //                 createdAt: "desc" // Order the users by creation time, newest first.
// // //             }
// // //         });
// // //     }

// // //     return users; // Return the list of users.

// // // }
