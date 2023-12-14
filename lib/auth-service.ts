// Import the necessary modules
import { currentUser } from "@clerk/nextjs"; // Importing the currentUser function from Clerk to get the current user's data
import { db } from "@/lib/db"; // Importing the database instance

export const getSelf = async () => {
    const self = await currentUser();

    if (!self || !self.username) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: { externalUserId: self.id },
    });

    if (!user) {
        throw new Error("Not found");
    }

    return user;
};
// // Define an asynchronous function getSelf to fetch the current user's data
// export const getSelf = async () => {
//     const self = await currentUser(); // Fetch the current user using Clerk's currentUser function

//     // Check if the user is not found or if the user does not have a username
//     if (!self || !self.username) {
//         throw new Error("Unauthorized"); // Throw an error if no user or username is found
//     }

//     // Fetch the user from your database using a unique identifier
//     const user = await db.user.findUnique({
//         where: { externalUserId: self.id }, // The unique identifier is the user's ID from Clerk
//     });

//     // Check if the user is not found in your database
//     if (!user) {
//         throw new Error("Not found"); // Throw an error if the user is not found
//     }

//     return user; // Return the user object if found
// };
