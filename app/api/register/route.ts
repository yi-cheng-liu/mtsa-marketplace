// Importing bcrypt for password encryption
import bcrypt from "bcrypt";
// Importing prisma from local source
import prisma from "@/app/libs/prismadb";
// Importing NextResponse from next/server for handling responses
import { NextResponse } from "next/server";

// Function to handle a POST request
export async function POST(request: Request) {
  try {

    // Parsing the JSON body of the request
    const body = await request.json();
  
    // Destructuring email, name, and password from the request body
    const { name, email, password } = body;
  
    const existingUser = await prisma.user.findUnique({ where: { email } });
  
    // If the user exists, return an error response
    if (existingUser) {
      return NextResponse.json({
        error: "Email has already been registered. Please login.",
      });
    }
  
    // Hashing the password with a salt of 20
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Creating a new user in the database with the provided email, name, and hashed password
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
  
    // Returning the newly created user as a JSON response
    return NextResponse.json(user);
  }
  catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({ error: "An unexpected error occurred during registration." });
  }
}
