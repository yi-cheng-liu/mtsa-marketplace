import prisma from "@/app/libs/prismadb";

export default async function getItems() { 
  try {
    const items = await prisma.item.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    const safeItems = items.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString()
    }));
    return safeItems;
  }
  catch (error: any) {
    throw new Error(error);
  }
}