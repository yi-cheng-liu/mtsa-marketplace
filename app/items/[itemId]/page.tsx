import getItemById from '@/app/actions/getItemById';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import ItemClient from './ItemClient';
import { EmptyStateMode } from '@/app/types/constants';

interface IParams {
  itemId?: string;
}

const ItemPage =  async ({params} : {params : IParams}) => {
  const item = await getItemById(params);
  const currentUser = await getCurrentUser();

  if (!item) {
    return (
      <ClientOnly>
        <EmptyState
          title="Error: Item not found"
          mode={EmptyStateMode.FULL_PAGE} />
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