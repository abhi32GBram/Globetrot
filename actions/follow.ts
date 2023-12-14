"use server";

import { revalidatePath } from "next/cache";

import {
    followUser, // Function to follow another user
    unfollowUser, // Function to unfollow another user
} from "@/lib/follow-service";

// Function triggered when user follows another user
export const onFollow = async (id: string) => {
    try {
        // Follow the user using followUser service
        const followedUser = await followUser(id);

        // Revalidate data for the homepage (/) to reflect the change
        revalidatePath("/");

        // If the followed user exists, revalidate their profile page as well
        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`);
        }

        // Return the followed user data for further use
        return followedUser;
    } catch (error) {
        // Handle any errors and throw a generic "Internal Error"
        throw new Error("Internal Error");
    }
};

// Function triggered when user unfollows another user
export const onUnfollow = async (id: string) => {
    try {
        // Unfollow the user using unfollowUser service
        const unfollowedUser = await unfollowUser(id);

        // Revalidate data for the homepage (/) to reflect the change
        revalidatePath("/");

        // If the unfollowed user exists, revalidate their profile page as well
        if (unfollowedUser) {
            revalidatePath(`/${unfollowedUser.following.username}`);
        }

        // Return the unfollowed user data for further use
        return unfollowedUser;
    } catch (error) {
        // Handle any errors and throw a generic "Internal Error"
        throw new Error("Internal Error");
    }
};

