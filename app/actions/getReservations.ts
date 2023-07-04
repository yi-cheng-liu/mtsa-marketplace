import prisma from "@/app/libs/prismadb";

interface IParams {
  itemId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { itemId, userId, authorId } = params;

    const query: any = {};

    if (itemId) {
      query.itemId = itemId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.item = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        item: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      pickupDate: reservation.pickupDate.toISOString(),
      item: {
        ...reservation.item,
        createdAt: reservation.item.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
