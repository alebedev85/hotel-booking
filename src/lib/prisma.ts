import { PrismaClient } from "@prisma/client";

// Глобальный объект для хранения PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

  // В development сохраняем PrismaClient в глобальном объекте, чтобы HMR не создавал новый
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
