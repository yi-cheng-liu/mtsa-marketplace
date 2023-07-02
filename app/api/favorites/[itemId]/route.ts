import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  itemId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  // Extract the itemId from the parameters
  const { itemId } = params;
  // We perform a validation check on the itemId.
  // If the itemId is not provided or if it is not a string, we throw an error.
  if (!itemId || typeof itemId !== "string") {
    throw new Error("Invalid item id");
  }

  // Current user has any existing favoriteIds, we spread them into a new array.
  // Current user have no existing favoriteIds, we create an empty array.
  // Then we add the new itemId to this array.
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(itemId);

  // Using the Prisma Client, we update the user's favoriteIds in the database.
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });
  return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { itemId } = params;
  if (!itemId || typeof itemId !== "string") {
    throw new Error("Invalid item id");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== itemId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });
  return NextResponse.json(user);
}
