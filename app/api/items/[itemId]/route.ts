import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

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
