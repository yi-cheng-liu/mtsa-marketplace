'use client'

import { SafeItem, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ItemHeading from "@/app/components/items/ItemHeading";
import ItemInfo from "@/app/components/items/ItemInfo";
import ItemAdditionalPhoto from "@/app/components/items/ItemAdditionalPhoto";

interface ItemClientProps {
  reservations?: Reservation[];
  item: SafeItem & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}
const ItemClient: React.FC<ItemClientProps> = ({ item, currentUser }) => {
  const category = useMemo(() => {
    return categories.find((category) => category.label === item.category);
  }, [item.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ItemHeading
            title={item.title}
            category={item.category}
            image={item.image}
            id={item.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ItemInfo user={item.user} description={item.description} />
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-4 xl:gap-6">
            <ItemAdditionalPhoto image={item.image2} />
            <ItemAdditionalPhoto image={item.image3}/>
            <ItemAdditionalPhoto image={item.image4}/>
            <ItemAdditionalPhoto image={item.image5}/>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ItemClient
