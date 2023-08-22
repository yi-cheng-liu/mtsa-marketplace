import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";

interface IParams {
  itemId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { itemId } = params;

  if (!itemId || typeof itemId !== "string") {
    throw new Error("Invalid ID");
  }

  const item = await prisma.item.deleteMany({
    where: {
      id: itemId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(item);
}

export async function PUT(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()

  // Ensure the user is authenticated
  if (!currentUser) {
    return NextResponse.error()
  }

  const { itemId } = params

  // Validate item ID
  if (!itemId || typeof itemId !== 'string') {
    throw new Error('Invalid ID')
  }

  // Parse the request body for the item's data
  const {
    title,
    description,
    image,
    image2,
    image3,
    image4,
    image5,
    category,
    itemCount,
    price
  } = await request.json()

  const intItemCount = parseFloat(itemCount)
  const floatPrice = parseFloat(price)

  try {
    console.log('Attempting to update item with ID:', itemId)
    console.log('Data for update:', title, description, image, image2, image3, image4, image5, category, itemCount, price)
    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: { title, description, image, image2, image3, image4, image5, category, itemCount: intItemCount, price: floatPrice }
    })
    console.log('Updated item:', updatedItem)
    return NextResponse.json(updatedItem)
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error('Error updating item:', error)
    return NextResponse.error()
  }
}

