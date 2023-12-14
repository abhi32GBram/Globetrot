// import { db } from "@/lib/db"
// import { getSelf } from "@/lib/auth-service"



// export const isBlockedByUser = async (id: string) => {
//     try {
//         const self = await getSelf()
//         const otherUser = await db.user.findUnique({
//             where: {
//                 id
//             }
//         })
//         if (!otherUser) {
//             throw new Error("User Not Found")
//         }
//         if (otherUser.id === self.id) {
//             return false
//         }
//         const existingBlock = await db.block.findUnique({
//             where: {
//                 blockedId_blockerId: {
//                     blockerId: otherUser.id,
//                     blockedId: self.id
//                 }
//             }
//         })

//         return !!existingBlock
//     } catch {
//         return false
//     }

// }

// export const blockUser = async (id: string) => {
//     const self = await getSelf()

//     if (self.id === id) {
//         throw new Error("Cannot Block Yourself LOL")
//     }

//     const otherUser = await db.user.findUnique({
//         where: {
//             id
//         }
//     })

//     if (!otherUser) {
//         throw new Error("User Not Found")
//     }

//     const existingBlock = await db.block.findUnique({
//         where: {
//             blockedId_blockerId: {
//                 blockerId: otherUser.id,
//                 blockedId: self.id
//             }
//         }
//     })

//     if (existingBlock) {
//         throw new Error("User Is Already Blocked")
//     }

//     const block = await db.block.create({
//         data: {
//             blockerId: self.id,
//             blockedId: otherUser.id
//         },
//         include: {
//             blocked: true
//         }
//     })
//     return block
// }




// export const unblockUser = async (id: string) => {
//     const self = await getSelf()

//     if (self.id === id) {
//         throw new Error("Cannot un-Block Yourself LOL")
//     }

//     const otherUser = await db.user.findUnique({
//         where: {
//             id
//         }
//     })

//     if (!otherUser) {
//         throw new Error("User Not Found")
//     }

//     const existingBlock = await db.block.findUnique({
//         where: {
//             blockedId_blockerId: {
//                 blockerId: self.id,
//                 blockedId: otherUser.id
//             }
//         }
//     })

//     if (!existingBlock) {
//         throw new Error("User isn't Blocked")
//     }

//     const unblock = await db.block.delete({
//         where: {
//             id: existingBlock.id
//         },
//         include: {
//             blocked: true
//         }
//     })

//     return unblock
// }

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

// Function to check if a user is blocked by the current user
export const isBlockedByUser = async (id: string) => {
    try {
        // Get the current user information
        const self = await getSelf();

        // Check if the provided user exists
        const otherUser = await db.user.findUnique({
            where: { id },
        });
        if (!otherUser) throw new Error("User Not Found");

        // Don't consider blocking yourself
        if (otherUser.id === self.id) return false;

        // Look for an existing block relationship
        const existingBlock = await db.block.findUnique({
            where: {
                blockedId_blockerId: { blockerId: otherUser.id, blockedId: self.id },
            },
        });

        // Return true if the current user has blocked the other user
        return !!existingBlock;
    } catch (error) {
        // Handle any errors and return false
        console.error(`Error checking blocked users: ${error}`);
        return false;
    }
};

// Function to block a user
export const blockUser = async (id: string) => {
    // Get the current user information
    const self = await getSelf();

    // Don't allow blocking yourself
    if (self.id === id) throw new Error("Cannot Block Yourself LOL");

    // Check if the user to block exists
    const otherUser = await db.user.findUnique({
        where: { id },
    });
    if (!otherUser) throw new Error("User Not Found");

    // Check if the user is already blocked
    const existingBlock = await db.block.findUnique({
        where: {
            blockedId_blockerId: { blockerId: self.id, blockedId: otherUser.id },
        },
    });
    if (existingBlock) throw new Error("User Is Already Blocked");

    // Create a new block relationship
    const block = await db.block.create({
        data: { blockerId: self.id, blockedId: otherUser.id },
        include: { blocked: true }, // Include the blocked user data
    });

    return block;
};

// Function to unblock a user
export const unblockUser = async (id: string) => {
    // Get the current user information
    const self = await getSelf();

    // Don't allow unblocking yourself
    if (self.id === id) throw new Error("Cannot un-Block Yourself LOL");

    // Check if the user to unblock exists
    const otherUser = await db.user.findUnique({
        where: { id },
    });
    if (!otherUser) throw new Error("User Not Found");

    // Check if the user is actually blocked
    const existingBlock = await db.block.findUnique({
        where: {
            blockedId_blockerId: { blockerId: self.id, blockedId: otherUser.id },
        },
    });
    if (!existingBlock) throw new Error("User isn't Blocked");

    // Delete the block relationship
    const unblock = await db.block.delete({
        where: { id: existingBlock.id },
        include: { blocked: true }, // Include the blocked user data
    });

    return unblock;
};
