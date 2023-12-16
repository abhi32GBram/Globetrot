import { db } from '@/lib/db'
import { getSelf } from './auth-service'

// Function to fetch a user's followed users
export const getFollowedUsers = async () => {
    try {
        // Get the current user's information
        const self = await getSelf();

        // Find all follow relationships where the current user is the follower
        const followedUsers = await db.follow.findMany({
            where: {
                followerId: self.id, // Filter by current user's ID
                following: {
                    blocking: {
                        none: {
                            blockedId: self.id
                        }
                    }
                }
            },
            include: {
                following: {
                    include: {
                        stream: {
                            select: {
                                isLive: true
                            }
                        }
                    }
                },
            },
        });

        // Return the list of followed users
        return followedUsers;
    } catch (error) {
        // Handle any errors and return an empty array
        console.error(`Error Fetching Followed Users: ${error}`);
        return [];
    }
};


// Function to check if the current user follows another user
export const isFollowingUser = async (id: string) => {
    try {
        const self = await getSelf();

        // Check if provided user exists
        const otherUser = await db.user.findUnique({
            where: { id },
        });

        if (!otherUser) {
            throw new Error("User not found");
        }

        // Don't consider self-following
        if (otherUser.id === self.id) {
            return true;
        }

        // Check for existing follow relationship
        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id,
            },
        });

        // Return true if following, false otherwise
        return !!existingFollow;
    } catch {
        return false;
    }
};

export const followUser = async (id: string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: { id },
    });

    if (!otherUser) {
        throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
        throw new Error("Cannot follow yourself");
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        },
    });

    if (existingFollow) {
        throw new Error("Already following");
    }

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id,
        },
        include: {
            following: true,
            follower: true,
        },
    });

    return follow;
};

export const unfollowUser = async (id: string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: {
            id,
        },
    });

    if (!otherUser) {
        throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
        throw new Error("Cannot unfollow yourself");
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        },
    });

    if (!existingFollow) {
        throw new Error("Not following");
    }

    const follow = await db.follow.delete({
        where: {
            id: existingFollow.id,
        },
        include: {
            following: true,
        },
    });

    return follow;
};


//====================================================================

// WELL COMMMENTED CODE TO NOT BREAK THE ACTUAL CODE :


// // // import { db } from '@/lib/db' // Import the database instance.
// // // import { getSelf } from './auth-service' // Import function to get current user's details.

// // // // Function to fetch a user's followed users.
// // // export const getFollowedUsers = async () => {
// // //     try {
// // //         // Retrieve the current user's information.
// // //         const self = await getSelf();

// // //         // Query the database to find all users followed by the current user.
// // //         const followedUsers = await db.follow.findMany({
// // //             where: {
// // //                 followerId: self.id, // Filter for relationships where the current user is the follower.
// // //                 following: {
// // //                     blocking: {
// // //                         none: { // Ensure the followed user is not blocking the current user.
// // //                             blockedId: self.id
// // //                         }
// // //                     }
// // //                 }
// // //             },
// // //             include: {
// // //                 following: { // Include additional details of the followed users.
// // //                     include: {
// // //                         stream: { // Include streaming status of the followed users.
// // //                             select: {
// // //                                 isLive: true // Select only the 'isLive' field.
// // //                             }
// // //                         }
// // //                     }
// // //                 },
// // //             },
// // //         });

// // //         // Return the list of followed users.
// // //         return followedUsers;
// // //     } catch (error) {
// // //         // Log and handle errors, returning an empty array in case of failure.
// // //         console.error(`Error Fetching Followed Users: ${error}`);
// // //         return [];
// // //     }
// // // };


// // // // Function to check if the current user follows another user.
// // // export const isFollowingUser = async (id: string) => {
// // //     try {
// // //         const self = await getSelf(); // Get the current user's information.

// // //         // Check if the user specified by 'id' exists in the database.
// // //         const otherUser = await db.user.findUnique({
// // //             where: { id },
// // //         });

// // //         // If the user is not found, throw an error.
// // //         if (!otherUser) {
// // //             throw new Error("User not found");
// // //         }

// // //         // Ignore the case where the current user is checking their own following status.
// // //         if (otherUser.id === self.id) {
// // //             return true;
// // //         }

// // //         // Check if a follow relationship exists between the current user and the other user.
// // //         const existingFollow = await db.follow.findFirst({
// // //             where: {
// // //                 followerId: self.id,
// // //                 followingId: otherUser.id,
// // //             },
// // //         });

// // //         // Return true if a follow relationship exists, false otherwise.
// // //         return !!existingFollow;
// // //     } catch {
// // //         // In case of any error, return false.
// // //         return false;
// // //     }
// // // };


// // // export const followUser = async (id: string) => {
// // //     const self = await getSelf(); // Get the current user's information.

// // //     // Retrieve the user to be followed.
// // //     const otherUser = await db.user.findUnique({
// // //         where: { id },
// // //     });

// // //     // If the user to follow does not exist, throw an error.
// // //     if (!otherUser) {
// // //         throw new Error("User not found");
// // //     }

// // //     // Prevent a user from following themselves.
// // //     if (otherUser.id === self.id) {
// // //         throw new Error("Cannot follow yourself");
// // //     }

// // //     // Check if the follow relationship already exists.
// // //     const existingFollow = await db.follow.findFirst({
// // //         where: {
// // //             followerId: self.id,
// // //             followingId: otherUser.id,
// // //         },
// // //     });

// // //     // If already following, throw an error.
// // //     if (existingFollow) {
// // //         throw new Error("Already following");
// // //     }

// // //     // Create a new follow relationship in the database.
// // //     const follow = await db.follow.create({
// // //         data: {
// // //             followerId: self.id,
// // //             followingId: otherUser.id,
// // //         },
// // //         include: {
// // //             following: true,
// // //             follower: true,
// // //         },
// // //     });

// // //     // Return the created follow relationship.
// // //     return follow;
// // // };


// // // export const unfollowUser = async (id: string) => {
// // //     const self = await getSelf(); // Get the current user's information.

// // //     // Find the user to unfollow.
// // //     const otherUser = await db.user.findUnique({
// // //         where: {
// // //             id,
// // //         },
// // //     });

// // //     // If the user does not exist, throw an error.
// // //     if (!otherUser) {
// // //         throw new Error("User not found");
// // //     }

// // //     // Prevent a user from trying to unfollow themselves.
// // //     if (otherUser.id === self.id) {
// // //         throw an Error("Cannot unfollow yourself");
// // //     }

// // //     // Check if the follow relationship exists.
// // //     const existingFollow = await db.follow.findFirst({
// // //         where: {
// // //             followerId: self.id,
// // //             followingId: otherUser.id,
// // //         },
// // //     });

// // //     // If not following, throw an error.
// // //     if (!existingFollow) {
// // //         throw an Error("Not following");
// // //     }

// // //     // Delete the follow relationship from the database.
// // //     const follow = await db.follow.delete({
// // //         where: {
// // //             id: existingFollow.id,
// // //         },
// // //         include: {
// // //             following: true,
// // //         },
// // //     });

// // //     // Return the deleted follow relationship.
// // //     return follow;
// // // };

