"use server";

import { revalidatePath } from "next/cache";
import { RoomServiceClient } from "livekit-server-sdk";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service"

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

export const onBlock = async (id: string) => {
    const self = await getSelf();

    let blockedUser;

    try {
        blockedUser = await blockUser(id);
    } catch {
        // the viewer was a guest account user
    }

    try {
        await roomService.removeParticipant(self.id, id);
    } catch {
        // the guest user is no more in the room and is kicked out 
    }

    revalidatePath(`/u/${self.username}/community`);

    return blockedUser;
};

export const onUnblock = async (id: string) => {
    const self = await getSelf();
    const unblockedUser = await unblockUser(id);

    revalidatePath(`/u/${self.username}/community`);
    return unblockedUser;
};


// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================


// // // Import necessary functions and libraries
// // import { revalidatePath } from "next/cache"; // Function to revalidate paths in Next.js cache
// // import { RoomServiceClient } from "livekit-server-sdk"; // SDK for interacting with LiveKit server

// // import { getSelf } from "@/lib/auth-service"; // Function to get current user's information
// // import { blockUser, unblockUser } from "@/lib/block-service"; // Functions to block and unblock a user

// // // Initialize the RoomServiceClient with necessary environment variables
// // const roomService = new RoomServiceClient(
// //     process.env.LIVEKIT_API_URL!, // URL of the LiveKit server
// //     process.env.LIVEKIT_API_KEY!, // API key for authentication
// //     process.env.LIVEKIT_API_SECRET!, // API secret for secure communication
// // );

// // // Define the onBlock function to block a user
// // export const onBlock = async (id: string) => {
// //     // Retrieve the current user's information
// //     const self = await getSelf();

// //     let blockedUser;

// //     try {
// //         // Attempt to block the user with the given ID
// //         blockedUser = await blockUser(id);
// //     } catch {
// //         // Handle failure (e.g., if the viewer was a guest account user)
// //     }

// //     try {
// //         // Attempt to remove the participant (the blocked user) from the room
// //         await roomService.removeParticipant(self.id, id);
// //     } catch {
// //         // Handle failure (e.g., if the guest user is no longer in the room)
// //     }

// //     // Revalidate the path to update the community page
// //     revalidatePath(`/u/${self.username}/community`);

// //     // Return the blocked user's information
// //     return blockedUser;
// // };

// // // Define the onUnblock function to unblock a user
// // export const onUnblock = async (id: string) => {
// //     // Retrieve the current user's information
// //     const self = await getSelf();

// //     // Unblock the user with the given ID
// //     const unblockedUser = await unblockUser(id);

// //     // Revalidate the path to update the community page
// //     revalidatePath(`/u/${self.username}/community`);

// //     // Return the unblocked user's information
// //     return unblockedUser;
// // };
