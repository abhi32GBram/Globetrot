

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { resetIngresses } from '@/actions/ingress'

// Import necessary libraries and modules. 'svix' is for handling webhooks, 
// 'next/headers' for dealing with request headers, 'WebhookEvent' is a type from Clerk's Next.js library,

export async function POST(req: Request) {
    // It takes a 'Request' object as an argument.

    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
    // Retrieves the webhook secret from the environment variables. 
    // This is essential for verifying the webhook's authenticity.

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }
    // If the webhook secret is not set, an error is thrown. 
    // This is a security measure to ensure that the webhook can't be processed without the secret.

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");
    // Extracts the necessary headers from the incoming webhook request. 
    // These headers are used for verifying the request's authenticity.

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', {
            status: 400
        })
    }
    // Checks if all required Svix headers are present. 
    // If not, it returns a 400 Bad Request response.

    const payload = await req.json()
    const body = JSON.stringify(payload);
    // Parses the JSON body of the request and then converts it back to a string.
    // This is needed for the verification step.

    const wh = new Webhook(WEBHOOK_SECRET);
    // Creates a new instance of Svix's Webhook class using the secret.

    let evt: WebhookEvent
    // Declares a variable 'evt' to store the verified webhook event.

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occurred', {
            status: 400
        })
    }
    // Verifies the webhook payload with the headers. 
    // If verification fails, logs the error and returns a 400 Bad Request response.

    const eventType = evt.type;
    // Extracts the event type from the verified event.

    // Conditional logic based on the eventType
    if (eventType === "user.created") {

        // Handle user creation event
        // Create a new user record in the database using the Prisma client
        await db.user.create({
            // Specify the data for the new user record
            data: {
                externalUserId: payload.data.id,       // Set the externalUserId field with the ID from payload data
                username: payload.data.username,       // Set the username field with the username from payload data
                imageUrl: payload.data.image_url,      // Set the imageUrl field with the image URL from payload data
                stream: {
                    create: {
                        // Create a related 'stream' record associated with this user
                        name: `${payload.data.username}'s Stream`  // Set the name of the stream, personalized with the user's username
                    }
                }
            }
        });

    } else if (eventType === "user.updated") {
        // Handle user update event
        const currentUser = await db.user.findUnique({
            where: { externalUserId: payload.data.id }
        });
        if (!currentUser) {
            return new Response("User Not Found", { status: 404 });
        }
        await db.user.update({
            where: { externalUserId: payload.data.id },
            data: {
                username: payload.data.username,
                imageUrl: payload.data.image_url,
            }
        });
    } else if (eventType === "user.deleted") {
        await resetIngresses(payload.data.id)
        // Handle user deletion event
        await db.user.delete({
            where: { externalUserId: payload.data.id }
        });
    }

    // Returns a 200 OK response if everything completes successfully.
    return new Response('', { status: 200 });
}
