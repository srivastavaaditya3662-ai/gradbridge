import { PrismaClient as AzurePrismaClient } from "@/generated/azure";
import { PrismaClient as PostgresPrismaClient } from "@/generated/postgres";

const globalForPrisma = globalThis as unknown as {
  prisma: any;
};

const provider = process.env.DATABASE_PROVIDER || "sqlserver";

const prisma =
  globalForPrisma.prisma ??
  (provider === "postgresql"
    ? new PostgresPrismaClient()
    : new AzurePrismaClient());

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { prisma };