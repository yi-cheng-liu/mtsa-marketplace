import { SafeItem, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ItemsCard from "@/app/components/items/ItemsCard";

interface SavedItemsClientProps {
  items: SafeItem[];
  currentUser?: SafeUser | null;
}

const SavedItemsClient: React.FC<SavedItemsClientProps> = ({
  items,
  currentUser,
}) => {
  return (
    <Container>
      <div className="py-6">
        <Heading title="Saved Items" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 xl:gap-6">
          {items.map((listing: any) => (
            <ItemsCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </div>
      
    </Container>
  );
};

export default SavedItemsClient;
