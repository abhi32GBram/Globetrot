"use server"

// Import required modules and components
import { Stream } from "@prisma/client" // Prisma client for database interactions
import { revalidatePath } from "next/cache" // Function to revalidate cached paths in Next.js

import { db } from "@/lib/db" // Database connection setup
import { getSelf } from "@/lib/auth-service" // Function to get authenticated user details

import React from 'react' // React import

// Define an asynchronous function to update stream details
export const updateStream = async (values: Partial<Stream>) => {
    try {
        // Retrieve details of the currently authenticated user
        const self = await getSelf()
        // Find the stream associated with the authenticated user
        const selfStream = await db.stream.findUnique({
            where: {
                userId: self.id
            }
        })

        // If the user's stream is not found, throw an error
        if (!selfStream) {
            throw new Error("Stream Not Found")
        }

        // Prepare the data to be updated in the stream
        const validData = {
            thumbnailUrl: values.thumbnailUrl,
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatFollowersOnly: values.isChatFollowersOnly,
            isChatDelay: values.isChatDelay
        }
        // Update the stream in the database with new values
        const stream = await db.stream.update({
            where: {
                id: selfStream.id
            },
            data: {
                ...validData
            }
        })

        // Revalidate cached paths related to the user's stream
        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`/${self.username}`)

        // Return the updated stream data
        return stream
    } catch {
        // In case of an error, throw a general internal error
        throw new Error("Internal Error Occurred ")
    }
}
