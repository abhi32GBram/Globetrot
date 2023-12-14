import { db } from '@/lib/db'
import { getSelf } from './auth-service'

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
