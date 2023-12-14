"use server";

import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";


// Function triggered when a user blocks another user
export const onBlock = async (id: string) => {
    try {
        // Block the user with the provided ID using block-service
        const blockedUser = await blockUser(id);

        // To-do: Implement logic to disconnect from chat and kick guest user
        // (This requires additional code and integration with your chat system)

        // Invalidate homepage data to reflect the change
        revalidatePath("/");

        // If the blocked user exists, also invalidate their profile page
        if (blockedUser) {
            revalidatePath(`/${blockedUser.blocked.username}`);
        }

        return blockedUser;
    } catch (error) {
        // Handle any errors and throw a descriptive error message
        throw new Error(`Error blocking user: ${error}`);
    }
};

// Function triggered when a user unblocks another user
export const onUnblock = async (id: string) => {
    try {
        // Unblock the user with the provided ID using unblock-service
        const unblockedUser = await unblockUser(id);

        // Invalidate homepage data to reflect the change
        revalidatePath("/");

        // If the unblocked user exists, also invalidate their profile page
        if (unblockedUser) {
            revalidatePath(`/${unblockedUser.blocked.username}`);
        }

        return unblockedUser;
    } catch (error) {
        // Handle any errors and throw a descriptive error message
        throw new Error(`Error unblocking user: ${error}`);
    }
};
