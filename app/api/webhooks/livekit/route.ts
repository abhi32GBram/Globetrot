import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";

import { db } from "@/lib/db";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
    const body = await req.text();
    const headerPayload = headers();
    const authorization = headerPayload.get("Authorization");

    if (!authorization) {
        return new Response("No Authorization Header", { status: 400 });
    }

    const event = receiver.receive(body, authorization);

    if (event.event === "ingress_started") {
        await db.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId,
            },
            data: {
                isLive: true,
            },
        });
    }

    if (event.event === "ingress_ended") {
        await db.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId,
            },
            data: {
                isLive: false,
            },
        });
    }
}

// ----------------------------------------------------------------------------------------------------------------
// // SEPARTED COMMENTED CODE TO NOT BREAK THE ACTUAL CODE

// // Import the 'headers' module for handling HTTP headers and the 'WebhookReceiver' class from the LiveKit SDK
// import { headers } from "next/headers";
// import { WebhookReceiver } from "livekit-server-sdk";

// // Import the database utility for database operations
// import { db } from "@/lib/db";

// // Initialize the WebhookReceiver with API key and secret from environment variables
// const receiver = new WebhookReceiver(
//     process.env.LIVEKIT_API_KEY!,
//     process.env.LIVEKIT_API_SECRET!,
// )

// // Define an asynchronous POST function to handle incoming webhook requests
// export async function POST(
//     req: Request // 'req' is the incoming HTTP request object
// ) {
//     const body = await req.text() // Extract the text body from the request
//     const headerPayload = headers() // Get the headers from the request
//     const authorization = headerPayload.get("Authorization") // Retrieve the 'Authorization' header

//     // Check if the 'Authorization' header is present
//     if (!authorization) {
//         return new Response("No Authorization Header", { status: 400 }) // Respond with an error if the header is missing
//     }

//     // Use the receiver to parse the webhook event from the request body and authorization header
//     const event = receiver.receive(body, authorization)

//     // Check if the event is 'ingress_started' indicating the start of a stream
//     if (event.event === "ingress_started") {
//         // Update the stream status in the database to 'isLive: true'
//         await db.stream.update({
//             where: {
//                 ingressId: event.ingressInfo?.ingressId // Use the ingress ID from the event
//             },
//             data: {
//                 isLive: true // Set the stream status to live
//             }
//         })
//     }

//     // Check if the event is 'ingress_ended' indicating the end of a stream
//     if (event.event === "ingress_ended") {
//         // Update the stream status in the database to 'isLive: false'
//         await db.stream.update({
//             where: {
//                 ingressId: event.ingressInfo?.ingressId // Use the ingress ID from the event
//             },
//             data: {
//                 isLive: false // Set the stream status to not live
//             }
//         })
//     }
// }
