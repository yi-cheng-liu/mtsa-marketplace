import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import Heading from "../components/Heading";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getSavedItems from "../actions/getSavedItems";
import SavedItemsClient from "./SavedClient";

const SavedItemPage = async () => {
  const items = await getSavedItems();
  const currentUser = await getCurrentUser();
  if (items.length === 0) { 
    return (
      <ClientOnly>
        <Container>
          <div className="py-6">
            <Heading title="SAVED ITEMS" />
            <EmptyState title="No saved items" />
          </div>
        </Container>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <SavedItemsClient items={items} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default SavedItemPage;