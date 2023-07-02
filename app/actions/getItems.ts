import prisma from "@/app/libs/prismadb";

export default async function getItems() { 
  try {
    const items = await prisma.item.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
    return items;
  }
  catch (error: any) {
    throw new Error(error);
  }
}