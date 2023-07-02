'use client'

import { SafeItem, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ItemHeading from "@/app/components/items/ItemHeading";

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
            image2={item.image2}
            image3={item.image3}
            image4={item.image4}
            image5={item.image5}
            id={item.id}
            currentUser={currentUser} />
        </div>
      </div>
    </Container>
  )
}

export default ItemClient
