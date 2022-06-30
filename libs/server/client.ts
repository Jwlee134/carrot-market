import { PrismaClient } from "@prisma/client";

// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

declare global {
  var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.client = client;

export default client;
