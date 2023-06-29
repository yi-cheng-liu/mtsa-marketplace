// Imports for Prisma adapter, NextAuth options, and various authentication providers
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

// Importing the Prisma client instance
import prisma from "@/app/libs/prismadb";

// Configuring NextAuth options
export const authOptions: AuthOptions = {
  // Using Prisma as the adapter for NextAuth. This connects NextAuth with the database.
  adapter: PrismaAdapter(prisma),
  providers: [
    // Adding GitHub as a provider for OAuth authentication
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // Adding Facebook as a provider for OAuth authentication
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    // Adding Google as a provider for OAuth authentication
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // Adding Credentials Provider for authentication using email and password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // Checking if credentials (email and password) exist
        if (!credentials?.email) {
          throw new Error("Invalid email");
        }
        if (!credentials?.password) {
          throw new Error("Invalid password");
        }

        // Finding a user in the database with the same email as the entered credentials
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // If no user is found or the user doesn't have a hashed password, throw an error
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid email");
        }

        // Checking if the entered password is correct by comparing it with the hashed password
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

        // If the password is incorrect, throw an error
        if (!isCorrectPassword) {
          throw new Error("Invalid password");
        }

        // If the credentials are valid, return the user
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  }, 
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  }, 
  secret: process.env.NEXTAUTH_SECRET, 
};

export default NextAuth(authOptions);
