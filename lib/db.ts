import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db



// // Basically :

// This code ensures that there's only one instance of PrismaClient created throughout your application.
// It provides a single point of access to the database client through the exported db variable.
// It avoids unnecessary database connections by utilizing a singleton pattern.
// It allows switching between environments easily by setting the NODE_ENV variable.