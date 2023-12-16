
// Import the database connection setup
import { db } from "@/lib/db";

// Define an asynchronous function to retrieve a stream by a user's ID
export const getStreamByUserId = async (userId: string) => {
    // Use the database connection to find a unique stream associated with the given userId
    const stream = await db.stream.findUnique({
        where: {
            userId // Using userId as the search criteria
        }
    })

    // Return the found stream
    return stream
}
