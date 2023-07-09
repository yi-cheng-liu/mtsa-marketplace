import prisma from "@/app/libs/prismadb";

export interface IItemsParams {
  userId?: string;
  category?: string;
  page?: number; // Add a page parameter
  pageSize?: number; // Add a pageSize parameter
}

export default async function getItems(params: IItemsParams) {
  try {
    const { userId, category, page = 1, pageSize = 15 } = params;

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
      include: {
        user: true,
      },
    });

    const safeItems = items.map((item) => ({
      ...item,
      user: {
        ...item.user,
        createdAt: item.user.createdAt.toISOString(),
        updatedAt: item.user.updatedAt.toISOString(),
        emailVerified: item.user.emailVerified
          ? item.user.emailVerified.toISOString()
          : null,
      },
      createdAt: item.createdAt.toISOString(),
    }));
    return safeItems;
  } catch (error: any) {
    throw new Error(error);
  }
}