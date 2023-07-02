import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if(!currentUser){
    return NextResponse.error();
  }

  const body = await request.json();
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
  } = body;

  const item = await prisma.item.create({
    data: {
      title,
      description,
      image,
      image2,
      image3,
      image4,
      image5,
      category,
      itemCount,
      price: parseFloat(price),
      user: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });

  return NextResponse.json(item);
}