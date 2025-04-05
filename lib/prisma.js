import { PrismaClient } from "@prisma/client";

let prisma;

if (typeof window === "undefined") {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
} else {
  // On the client, we don't create a new PrismaClient
  prisma = null;
}

export { prisma };
