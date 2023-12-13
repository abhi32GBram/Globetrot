import { currentUser } from "@clerk/nextjs"; // Importing the currentUser function from Clerk to handle user authentication.
import { db } from "@/lib/db"; // Importing a database instance from a custom library.

export const getSelf = async () => { // Declaring an asynchronous function named getSelf.
    const self = await currentUser() // Calling currentUser to get the authenticated user's details.

    if (!self || !self.username) { // Checking if the user object is empty or if the username is not present.
        throw new Error("Unauthorized Access") // Throwing an error if the user is not authenticated or lacks a username.
    }

    const user = await db.user.findUnique({ // Querying the database to find a unique user.
        where: {
            externalUserId: self.id // Using the ID from the authenticated user to search in the database.
        }
    })

    if (!user) { // Checking if the user was not found in the database.
        throw new Error("User Not Found ") // Throwing an error if the user does not exist in the database.
    }

    // Note: The function currently does not return or use the 'user' data fetched from the database.
}
