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
            },
            include: {
                following: true, // Include the details of the followed users
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
