import { PrismaClient } from "@prisma/client";

// Extending the global Node.js object to include a variable for Prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// If prisma isn't already defined in the global object, instantiate a new Prisma client
// This checks if prisma client is already created if yes then reuses it otherwise creates a new one.
// This prevents multiple instances of Prisma Client in development environment.
const client = global.prisma || new PrismaClient();

// If we're not in a production environment, attach Prisma client to the globalThis object 
// This makes sure, during development and testing you can use the PrismaClient instance created here
// in the rest of your application like seeding script or tests.
if (process.env.NODE_ENV != "production") globalThis.prisma = client;

export default client;