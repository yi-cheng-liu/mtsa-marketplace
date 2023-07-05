// Importing bcrypt for password encryption
import bcrypt from "bcrypt";
// Importing prisma from local source
import prisma from "@/app/libs/prismadb";
// Importing NextResponse from next/server for handling responses
import { NextResponse } from "next/server";

// Function to handle a POST request
export async function POST(request: Request) {
  // Parsing the JSON body of the request
  const body = await request.json();

  // Destructuring email, name, and password from the request body
  const { name, email, password } = body;

  // Hashing the password with a salt of 20
  const hashedPassword = await bcrypt.hash(password, 20);

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
