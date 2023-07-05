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
      pickupDate: new Date(pickupDate),
    },
  });

  // updating user with the reservationId
  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      reservation: {
        connect: {
          id: itemAndReservation.id,
        },
      },
    },
  });

  return NextResponse.json(itemAndReservation);
}
