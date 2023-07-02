import getItemById from '@/app/actions/getItemById';

interface IParams {
  itemId?: string;
}

const ItemPage =  async ({params} : {params : IParams}) => {
  const item = await getItemById(params);
  
  return (
    <div>
      <h1>Item Page</h1>
    </div>
  )
}

export default ItemPage;