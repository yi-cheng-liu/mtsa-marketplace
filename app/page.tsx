import getItems from "./actions/getItems";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";


export default async function Home() {
  const items = await getItems();

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
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {items.map((item: any) => {
            return (<div key={item.id}>{item.title}</div>);
           })}
        </div>
      </Container>
    </ClientOnly>
  )
}
