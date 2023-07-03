import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { itemId, pickupDate } = body;

  if (!itemId || !pickupDate) {
    return NextResponse.error();
  }

  const itemAndReservation = await prisma.reservation.create({
    data: {
      userId: currentUser.id,
      itemId: itemId,
      pickupDate: new Date(),
    },
  });

  return NextResponse.json(itemAndReservation);
}
