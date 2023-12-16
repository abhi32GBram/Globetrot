"use server"

// Import required components and types from the livekit-server-sdk
import {
    IngressAudioEncodingPreset, IngressInput, IngressClient,
    IngressVideoEncodingPreset, RoomServiceClient, type CreateIngressOptions
} from "livekit-server-sdk";
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models"; // Import TrackSource from livekit models
import { db } from "@/lib/db"; // Database connection setup
import { getSelf } from "@/lib/auth-service"; // Function to get authenticated user details
import { revalidatePath } from "next/cache"; // Function to revalidate cached paths in Next.js

// Initialize the RoomServiceClient with environment variables
const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

// Initialize the IngressClient with the API URL
const ingressClient = new IngressClient(
    process.env.LIVEKIT_API_URL!,
);

// Define an asynchronous function to reset ingresses for a given host identity
const resetIngresses = async (hostIdentity: string) => {
    // List all ingresses for the specified room name
    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity
    });

    // List all rooms for the specified host identity
    const rooms = await roomService.listRooms([hostIdentity]);

    // Delete each room found in the list
    for (const room of rooms) {
        await roomService.deleteRoom(room.name);
    }

    // Delete each ingress found in the list
    for (const ingress of ingresses) {
        if (ingress.ingressId) {
            await ingressClient.deleteIngress(ingress.ingressId);
        }
    }
};

// Define an asynchronous function to create a new ingress
export const createIngress = async (ingressType: IngressInput) => {
    // Get details of the currently authenticated user
    const self = await getSelf();

    // Reset ingresses for the authenticated user's ID
    await resetIngresses(self.id);

    // Set up options for creating a new ingress
    const options: CreateIngressOptions = {
        name: self.username,
        roomName: self.id,
        participantName: self.username,
        participantIdentity: self.id,
    };

    // Configure options based on the type of ingress input
    if (ingressType === IngressInput.WHIP_INPUT) {
        options.bypassTranscoding = true;
    } else {
        options.video = {
            source: TrackSource.CAMERA,
            preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
        };
        options.audio = {
            source: TrackSource.MICROPHONE,
            preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
        };
    }

    // Create a new ingress with the specified options
    const ingress = await ingressClient.createIngress(
        ingressType, options
    );

    // Throw an error if the ingress creation fails
    if (!ingress || !ingress.url || !ingress.streamKey) {
        throw new Error("Failed To Create Ingress ");
    }

    // Update the stream details in the database with the new ingress information
    await db.stream.update({
        where: {
            userId: self.id
        },
        data: {
            ingressId: ingress.ingressId,
            serverUrl: ingress.url,
            streamKey: ingress.streamKey
        }
    });

    // Revalidate the cache for the user's keys path
    revalidatePath(`/u/${self.username}/keys`);

    // Return the created ingress
    return ingress;
}


// ------------------------------------------------------
// THE DETAILED AND WELL COMMENTED COUNTERPART OF THE CODE ABOVE (TO AVOID BREAKING THE CODE )

// "use server"

// // Import the necessary components and types from the livekit-server-sdk
// import {
//     IngressAudioEncodingPreset, IngressInput, IngressClient,
//     IngressVideoEncodingPreset, RoomServiceClient, type CreateIngressOptions
// } from "livekit-server-sdk";
// import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models"; // Import TrackSource for specifying the type of media track
// import { db } from "@/lib/db"; // Import the database connection
// import { getSelf } from "@/lib/auth-service"; // Import a function to get the authenticated user's details
// import { revalidatePath } from "next/cache"; // Import a function to revalidate paths in Next.js cache

// // Initialize RoomServiceClient with environment variables for API access
// const roomService = new RoomServiceClient(
//     process.env.LIVEKIT_API_URL!,       // API URL
//     process.env.LIVEKIT_API_KEY!,       // API key
//     process.env.LIVEKIT_API_SECRET!,    // API secret
// );

// // Initialize IngressClient with the API URL for managing ingresses
// const ingressClient = new IngressClient(
//     process.env.LIVEKIT_API_URL!,
// );

// // Define a function to reset ingresses for a given host identity
// const resetIngresses = async (hostIdentity: string) => {
//     // List all ingresses associated with the specified room name
//     const ingresses = await ingressClient.listIngress({
//         roomName: hostIdentity
//     });

//     // List all rooms associated with the specified host identity
//     const rooms = await roomService.listRooms([hostIdentity]);

//     // Iterate and delete each room found in the list
//     for (const room of rooms) {
//         await roomService.deleteRoom(room.name);
//     }

//     // Iterate and delete each ingress found in the list
//     for (const ingress of ingresses) {
//         if (ingress.ingressId) {
//             await ingressClient.deleteIngress(ingress.ingressId);
//         }
//     }
// };

// // Define a function to create a new ingress
// export const createIngress = async (ingressType: IngressInput) => {
//     // Retrieve the current authenticated user's details
//     const self = await getSelf();

//     // Reset ingresses for the user's ID
//     await resetIngresses(self.id);

//     // Prepare options for creating a new ingress
//     const options: CreateIngressOptions = {
//         name: self.username,              // Set ingress name as the user's username
//         roomName: self.id,                // Set room name as the user's ID
//         participantName: self.username,   // Set participant name as the user's username
//         participantIdentity: self.id,     // Set participant identity as the user's ID
//     };

//     // Configure options based on the ingress input type
//     if (ingressType === IngressInput.WHIP_INPUT) {
//         options.bypassTranscoding = true; // Bypass transcoding for WHIP input
//     } else {
//         options.video = {
//             source: TrackSource.CAMERA,   // Set video source as camera
//             preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS // Set video encoding preset
//         };
//         options.audio = {
//             source: TrackSource.MICROPHONE, // Set audio source as microphone
//             preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS // Set audio encoding preset
//         };
//     }

//     // Create a new ingress with the specified type and options
//     const ingress = await ingressClient.createIngress(
//         ingressType, options
//     );

//     // Check if ingress creation was successful, else throw an error
//     if (!ingress || !ingress.url || !ingress.streamKey) {
//         throw new Error("Failed To Create Ingress ");
//     }

//     // Update the user's stream information in the database with the new ingress details
//     await db.stream.update({
//         where: {
//             userId: self.id // Specify the user's ID
//         },
//         data: {
//             ingressId: ingress.ingressId, // Update ingress ID
//             serverUrl: ingress.url,       // Update server URL
//             streamKey: ingress.streamKey   // Update stream key
//         }
//     });

//     // Revalidate the cache for the specified user path
//     revalidatePath(`/u/${self.username}/keys`);

//     // Return the created ingress object
//     return ingress;
// }
