"use server";

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";

import { getSelf } from "@/lib/auth-service";
import { getUserById } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";

export const createViewerToken = async (hostIdentity: string) => {
    let self;

    try {
        self = await getSelf();
    } catch {
        const id = v4();
        const username = `guest#${Math.floor(Math.random() * 1000)}`;
        self = { id, username };
    }

    const host = await getUserById(hostIdentity);

    if (!host) {
        throw new Error("User Not Found");
    }

    const isBlocked = await isBlockedByUser(host.id);

    if (isBlocked) {
        throw new Error("User Is Blocked ");
    }

    const isHost = self.id === host.id;

    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!,
        {
            identity: isHost ? `host-${self.id}` : self.id,
            name: self.username,
        }
    );

    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true,
    });

    return await Promise.resolve(token.toJwt());
};

//====================================================================

// WELL COMMMENTED CODE TO NOT BREAK THE ACTUAL CODE :


// // // "use server"; // Indicates that this code is intended to run on a server.

// // // // Importing necessary modules and libraries.
// // // import { v4 } from "uuid"; // Import UUID generator for creating unique identifiers.
// // // import { AccessToken } from "livekit-server-sdk"; // Import AccessToken from LiveKit SDK for managing access tokens.

// // // // Importing helper functions for user authentication and data retrieval.
// // // import { getSelf } from "@/lib/auth-service"; // Import function to get the current authenticated user's details.
// // // import { getUserById } from "@/lib/user-service"; // Import function to retrieve user details by their ID.
// // // import { isBlockedByUser } from "@/lib/block-service"; // Import function to check if a user has been blocked.

// // // // Define an asynchronous function to create a viewer token.
// // // export const createViewerToken = async (hostIdentity: string) => {
// // //     let self; // Variable to store information about the current user.

// // //     try {
// // //         self = await getSelf(); // Try to get the current authenticated user's information.
// // //     } catch {
// // //         // In case of failure (e.g., user is not authenticated), generate a guest user.
// // //         const id = v4(); // Generate a random unique ID for the guest.
// // //         const username = `guest#${Math.floor(Math.random() * 1000)}`; // Create a guest username with a random number.
// // //         self = { id, username }; // Assign the generated ID and username to self.
// // //     }

// // //     // Retrieve the host user's details using their identity.
// // //     const host = await getUserById(hostIdentity);
// // //     // If the host user is not found, throw an error.
// // //     if (!host) {
// // //         throw new Error("User not found");
// // //     }

// // //     // Check if the current user is blocked by the host user.
// // //     const isBlocked = await isBlockedByUser(host.id);
// // //     // If the user is blocked, throw an error.
// // //     if (isBlocked) {
// // //         throw new Error("User is blocked");
// // //     }

// // //     // Determine if the current user is the host.
// // //     const isHost = self.id === host.id;

// // //     // Create a new access token for the user.
// // //     const token = new AccessToken(
// // //         process.env.LIVEKIT_API_KEY!, // Use the API key from environment variables.
// // //         process.env.LIVEKIT_API_SECRET!, // Use the API secret from environment variables.
// // //         {
// // //             // Set the token's identity; prefix with 'host-' if the user is the host.
// // //             identity: isHost ? `host-${self.id}` : self.id,
// // //             name: self.username, // Include the user's username in the token.
// // //         }
// // //     );

// // //     // Add permissions to the token.
// // //     token.addGrant({
// // //         room: host.id, // Specify the host's ID as the room identifier.
// // //         roomJoin: true, // Allow the user to join the room.
// // //         canPublish: false, // Disallow the user from publishing video or audio streams.
// // //         canPublishData: true, // Allow the user to publish data, like chat messages.
// // //     });

// // //     // Return the JWT representation of the token.
// // //     return await Promise.resolve(token.toJwt());
// // // };
