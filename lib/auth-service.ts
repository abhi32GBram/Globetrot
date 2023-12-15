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

// export const getSelfByUsername = async (username: string) => {
//     const self = await currentUser();

//     if (!self || !self.username) {
//         throw new Error("Unauthorized");
//     }

//     const user = await db.user.findUnique({
//         where: { username }
//     });

//     if (!user) {
//         throw new Error("User Not Found");
//     }

//     if (self.username !== user.username) {
//         throw new Error("Unauthorized");
//     }

//     return user;
// };

// Define an asynchronous function getSelfByUsername that takes a username as an argument
export const getSelfByUsername = async (username: string) => {
    // Retrieve the current user's details
    const self = await currentUser();

    // Check if the current user (self) is not defined or doesn't have a username
    if (!self || !self.username) {
        // If the check fails, throw an Unauthorized error
        throw new Error("Unauthorized");
    }

    // Fetch a user from the database with the given username
    const user = await db.user.findUnique({
        where: { username } // Specify the username in the query
    });

    // Check if the user does not exist in the database
    if (!user) {
        // If the user is not found, throw a User Not Found error
        throw new Error("User Not Found");
    }

    // Check if the username of the current user (self) does not match the username of the fetched user
    if (self.username !== user.username) {
        // If the usernames don't match, throw an Unauthorized error
        throw new Error("Unauthorized");
    }

    // Return the user object if all checks pass
    return user;
};
