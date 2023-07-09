import prisma from "@/app/libs/prismadb";

export interface IItemsParams {
  userId?: string;
  category?: string;
  page?: number; // Add a page parameter
  pageSize?: number; // Add a pageSize parameter
}

export default async function getItems(params: IItemsParams) {
  try {
    const { userId, category, page = 3, pageSize = 5 } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    const items = await prisma.item.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
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