import { PrismaClient } from "@prisma/client";

// Создаём глобальный объект для хранения экземпляра PrismaClient
// Это нужно, чтобы избежать создания нескольких экземпляров при HMR (hot reload) в development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Если глобальный экземпляр уже существует — используем его, иначе создаём новый
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // логируем все SQL-запросы (удобно для отладки)
  });

// В режиме разработки сохраняем экземпляр в глобальном объекте,
// чтобы при hot reload не создавать новый PrismaClient
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;