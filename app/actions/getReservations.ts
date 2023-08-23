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
        item: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      pickupDate: reservation.pickupDate.toISOString(),
      item: {
        ...reservation.item,
        createdAt: reservation.item.createdAt.toISOString(),
        user: {
          ...reservation.item.user,
          createdAt: reservation.item.user.createdAt.toISOString(),
          updatedAt: reservation.item.user.updatedAt.toISOString(),
          emailVerified: reservation.item.user.emailVerified
            ? reservation.item.user.emailVerified.toISOString()
            : null
        }
      }
    }))

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
