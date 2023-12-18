"use server"

import { getSelf } from "@/lib/auth-service"
import { db } from "@/lib/db"
import { User } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const updateUser = async (values: Partial<User>) => {

    try {

        const self = await getSelf()

        const validData = {
            bio: values.bio
        }

        const user = await db.user.update({
            where: {
                id: self.id
            }, data: {
                ...validData
            }
        })

        revalidatePath(`/${self.username}`)
        revalidatePath(`/u/${self.username}`)
        return user

    } catch {
        throw new Error("Internal Error Occurred")
    }
}

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE
// // =========================================================================================================================


// // // Import necessary functions and libraries
// // import { getSelf } from "@/lib/auth-service" // Function to get the current user's information
// // import { db } from "@/lib/db" // Database instance for operations
// // import { User } from "@prisma/client" // Prisma client model for User
// // import { revalidatePath } from "next/cache" // Function to revalidate paths in Next.js cache

// // // Define the updateUser function, which takes a subset of User properties
// // export const updateUser = async (values: Partial<User>) => {

// //     try {
// //         // Retrieve the current user's information
// //         const self = await getSelf()

// //         // Create an object with the valid data to update
// //         // This example only updates the 'bio' field
// //         const validData = {
// //             bio: values.bio
// //         }

// //         // Update the user in the database using Prisma client
// //         const user = await db.user.update({
// //             where: {
// //                 id: self.id // Specify the user to update by their ID
// //             }, 
// //             data: {
// //                 ...validData // Spread the validData object to update fields
// //             }
// //         })

// //         // Revalidate the user's public profile pages to reflect changes
// //         // This is specific to Next.js's Incremental Static Regeneration feature
// //         revalidatePath(`/${self.username}`) // Revalidate the path with the user's username
// //         revalidatePath(`/u/${self.username}`) // Revalidate another path format with the username

// //         // Return the updated user object
// //         return user

// //     } catch {
// //         // If an error occurs, throw a new error with a custom message
// //         throw new Error("Internal Error Occurred")
// //     }
// // }
