import prisma from "@/app/libs/prismadb";

interface IParams {
  itemId: string;
}

export default async function getItemById( params : IParams) {
  try {
    const { itemId } = params;
    const item = await prisma.item.findUnique({
      where: {
        id: itemId
      }, 
      include: {
        user: true
      }
    });
    if (!item) {
      return null;
    }
    return {
      ...item,
      createdAt: item.createdAt.toISOString(),
      user: {
        ...item.user,
        createdAt: item.user.createdAt.toISOString(),
        updatedAt: item.user.updatedAt.toISOString(),
        emailVerified: item.user.emailVerified?.toISOString()
      }
    };
  }
  catch (error: any) {
    throw new Error(error);
  }
}