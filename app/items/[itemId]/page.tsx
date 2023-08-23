import getItemById from '@/app/actions/getItemById';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import ItemClient from './ItemClient';

interface IParams {
  itemId?: string;
}

const ItemPage =  async ({params} : {params : IParams}) => {
  const item = await getItemById(params);
  const currentUser = await getCurrentUser();

  if (!item) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <ItemClient
        item={item}
        currentUser={currentUser} />
    </ClientOnly>
  );
}

export default ItemPage;