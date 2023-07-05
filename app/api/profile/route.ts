// Import dependencies
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Retrieve the current user
  const currentUser = await getCurrentUser();

  // Check if the user exists
  if (!currentUser) {
    return NextResponse.error(); // Return error if no user found
  }

  // Parse the request body
  const { phone, pickupAddress, finalPickupDate } = await request.json();

  // Perform the update
  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      phone,
      pickupAddress,
      finalPickupDate: new Date(finalPickupDate),
    },
  });

  // Return the updated user
  return NextResponse.json(updatedUser);
}
