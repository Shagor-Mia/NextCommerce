// In your prisma.ts file
import { PrismaClient } from "@prisma/client";

// Use a singleton pattern to avoid multiple instances
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
