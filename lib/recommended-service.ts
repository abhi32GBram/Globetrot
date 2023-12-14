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

// //  // If a user is logged in, filter and recommend users
// //  if (userId) {
// //     users = await db.user.findMany({
// //       // Order by newest first
// //       orderBy: { createdAt: "desc" },
// //       // Filter conditions:
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
// //       },
// //     });
// //   } else {
// //     // If no user is logged in, simply fetch recent users
// //     users = await db.user.findMany({
// //       // Order by newest first
// //       orderBy: { createdAt: "desc" },
// //     });
// //   }