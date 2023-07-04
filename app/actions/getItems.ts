import prisma from "@/app/libs/prismadb";

export interface IItemsParams {
  userId?: string;
  pickupDate?: string;
  category?: string;
}

export default async function getItems(params: IItemsParams) {
  try {
    const { userId, pickupDate, category } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }
    if (pickupDate) {
      query.pickupDate = pickupDate;
    }

    if (category) {
      query.category = category;
    }

    const items = await prisma.item.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeItems = items.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
    }));
    return safeItems;
  } catch (error: any) {
    throw new Error(error);
  }
}