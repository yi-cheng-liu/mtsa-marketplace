import prisma from "@/app/libs/prismadb";

export interface IItemsParams {
  userId?: string;
  category?: string;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

export default async function getItems(params: IItemsParams) {
  try {
    const { userId, category, page = 1, pageSize = 30, searchTerm = "" } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (searchTerm) {
      query = {
        ...query,
        OR: [
          { title: { contains: searchTerm, mode: "insensitive" } },
          { category: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ],
      };
    }

    query.reservation = null;

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