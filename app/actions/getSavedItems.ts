import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getSavedItems() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }

    let query: any = {
      reservation: null,
      id: {
        in: [...(currentUser.favoriteIds || [])]
      }
    }

    const savedItems = await prisma.item.findMany({
      where: query,
    });

    const safeSavedItems = savedItems.map((saved) => ({
      ...saved,
      createdAt: saved.createdAt.toISOString(),
    }));

    return safeSavedItems;
  } catch (error: any) {
    throw new Error(error);
  }
}
