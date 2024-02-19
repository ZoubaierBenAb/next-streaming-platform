import { PrismaClient } from "@prisma/client";

// the synthax allows you to declare new global variables or argument existing ones
declare global {
    var prisma : PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db