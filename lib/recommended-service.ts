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

            orderBy: {
                createdAt: "desc"
            },
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
                },{
                    NOT:{
                        blocking:{
                            some :{
                                blockedId: userId
                            }
                        }
                    }
                }]
            },
        })

    } else {
        users = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    return users

}


/// COMMENTED VERSION OF THIS CODE :
// // import { db } from "@/lib/db";
// // import { getSelf } from "@/lib/auth-service";

// // // Function to fetch recommended users
// // export const getRecommended = async () => {
// //   // Store current user ID (initially null)
// //   let userId;

// //   try {
// //     // Get current user information, if logged in
// //     const self = await getSelf();
// //     userId = self.id;
// //   } catch (error) {
// //     // Handle error and set user ID to null
// //     console.error(`Error fetching current user: ${error}`);
// //     userId = null;
// //   }

// //   // Initialize empty user list
// //   let users = [];

// //   // Filter and recommend users only if a user is logged in
// //   if (userId) {
// //     users = await db.user.findMany({
// //       // Order by newest first
// //       orderBy: { createdAt: "desc" },
// //       // Filter conditions (multiple AND clauses):
// //       where: {
// //         // Exclude the current user
// //         NOT: { id: userId },
// //         // Exclude users already followed by the current user
// //         NOT: {
// //           followedBy: {
// //             // Check for any follow relationship where the current user is the follower
// //             some: { followerId: userId },
// //           },
// //         },
// //         // Exclude users currently blocking the current user
// //         NOT: {
// //           blocking: {
// //             // Check for any block relationship where the current user is blocked
// //             some: { blockedId: userId },
// //           },
// //         },
// //       },
// //     });
// //   } else {
// //     // If no user is logged in, simply fetch recent users
// //     users = await db.user.findMany({
// //       // Order by newest first
// //       orderBy: { createdAt: "desc" },
// //     });
// //   }

// //   // Return the list of recommended users
// //   return users;
// // };
