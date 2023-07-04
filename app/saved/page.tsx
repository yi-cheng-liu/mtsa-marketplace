import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getSavedItems from "../actions/getSavedItems";
import ItemsCard from "../components/items/ItemsCard";
import SavedItemsClient from "./SavedClient";

const SavedItemPage = async () => {
  const items = await getSavedItems();
  const currentUser = await getCurrentUser();
  if (items.length === 0) { 
    return (
      <ClientOnly>
        <EmptyState title="No saved items" />
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