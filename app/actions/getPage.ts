import prisma from '@/app/libs/prismadb';
import getItems from './getItems';

export interface IPageParams {
  page?: number
  pageSize?: number
}

export async function getPage(params: IPageParams) {
  const { page = 1, pageSize = 21 } = params

  const { query } = await getItems(params)

  const totalItemsCount = await prisma.item.count({
    where: query
  })

  const items = await prisma.item.findMany({
    skip: page ? (page - 1) * pageSize : 0,
    take: pageSize,
    where: query,
    include: {
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const safeItems = items.map((item) => ({
    ...item,
    user: {
      ...item.user,
      createdAt: item.user.createdAt.toISOString(),
      updatedAt: item.user.updatedAt.toISOString(),
      emailVerified: item.user.emailVerified
        ? item.user.emailVerified.toISOString()
        : null
    },
    createdAt: item.createdAt.toISOString()
  }))

  return { items: safeItems, totalItemsCount }
}
