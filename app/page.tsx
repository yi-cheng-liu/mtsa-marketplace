import getItems from "./actions/getItems";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ItemsCard from "./components/items/ItemsCard";


export default async function Home() {
  const items = await getItems();
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
        <div className="pt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {items.map((item: any) => {
            return (
              <ItemsCard key={ item.id } data={ item } currentUser={currentUser} />
            );
           })}
        </div>
      </Container>
    </ClientOnly>
  )
}
