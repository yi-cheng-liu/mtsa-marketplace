import prisma from "@/app/libs/prismadb";

export interface IItemsParams {
  userId?: string;
  category?: string;
}

export default async function getItems(params: IItemsParams) {
  try {
    const { userId, category } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
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