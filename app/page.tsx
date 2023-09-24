import getItems, { IItemsParams } from "./actions/getItems";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Container from './components/Container'
import EmptyState from "./components/EmptyState";
import ItemsCard from "./components/items/ItemsCard";
import CustomPagination from './components/Pagination'
import { EmptyStateMode } from "./types/constants";


interface HomeProps {
  searchParams: IItemsParams;
};


export default async function Home({ searchParams }: HomeProps) {

  // Get all the items
  let result;
  let items = [];
  if (searchParams.category || searchParams.search || searchParams.page) {
    result = await getItems(searchParams)
    items = result.items
  } else {
    result = await getItems({})
    items = result.items
  }
  
  const currentUser = await getCurrentUser();

  const isHomeUrl =
    !searchParams.category && !searchParams.search

  if (items.length == 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Items of this category"
          mode={EmptyStateMode.HOME}
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-28 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 xl:gap-6">
          {items.map((item) => {
            return (
              <ItemsCard key={item.id} data={item} currentUser={currentUser} />
            )
          })}
        </div>
        <CustomPagination
          totalItemsCount={result.totalItemsCount}
          isHomeUrl={isHomeUrl}
        />
      </Container>
    </ClientOnly>
  )
}
