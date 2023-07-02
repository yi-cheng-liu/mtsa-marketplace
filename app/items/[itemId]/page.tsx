import getItemById from '@/app/actions/getItemById';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';

interface IParams {
  itemId?: string;
}

const ItemPage =  async ({params} : {params : IParams}) => {
  const item = await getItemById(params);

  if (!item) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <EmptyState />
    </ClientOnly>
  );
}

export default ItemPage;