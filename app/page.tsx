import getItems, { IItemsParams } from "./actions/getItems";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ItemsCard from "./components/items/ItemsCard";
import CustomPagination from './components/Pagination'


interface HomeProps {
  searchParams: IItemsParams;
};


export default async function Home({ searchParams }: HomeProps) {

  let items = [];
  const { totalItems } = await getItems({})
  if (searchParams.category || searchParams.search || searchParams.page) {
    items = (await getItems(searchParams)).items;
  } else {
    items = (await getItems({})).items;
  }

  let totalCount = totalItems.length;
  
  const currentUser = await getCurrentUser();

  if (items.length == 0) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 md:gap-4 xl:gap-6">
          {items.map((item) => {
            return (
              <ItemsCard key={item.id} data={item} currentUser={currentUser} />
            )
          })}
        </div>
        <CustomPagination totalItems={totalCount} items={items} />
      </Container>
    </ClientOnly>
  )
}
