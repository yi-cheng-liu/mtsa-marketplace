'use client'

import { SafeItem, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ItemHeading from "@/app/components/items/ItemHeading";
import ItemInfo from "@/app/components/items/ItemInfo";
import ItemAdditionalPhoto from "@/app/components/items/ItemAdditionalPhoto";

import ItemReservation from "@/app/components/items/ItemReservation";


interface ItemClientProps {
  reservations?: Reservation[];
  item: SafeItem & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ItemClient: React.FC<ItemClientProps> = ({
  reservations,
  item,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find((items) => items.label === item.category);
  }, [item.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-8">
          {/* Heading and Image */}
          <ItemHeading
            title={item.title}
            category={item.category}
            image={item.image}
            id={item.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-10 mt-6">
            {/* ItemInfo = ItemOwner + ItemCategory + Description */}
            <ItemInfo
              user={item.user}
              currentUser={currentUser}
              description={item.description}
              category={category}
            />
            <ItemReservation
              reservations={reservations}
              item={item}
              currentUser={currentUser}
            />
          </div>

          {item.image2 || item.image3 || item.image4 || item.image5 ? (
            <>
              <hr className=" border-b-[1px]" />
              <div className="text-lg font-semibold">More Photo</div>
              <div className="grid grid-cols-2 gap-2 md:gap-4 xl:gap-6">
                {item.image2 && <ItemAdditionalPhoto image={item.image2} />}
                {item.image3 && <ItemAdditionalPhoto image={item.image3} />}
                {item.image4 && <ItemAdditionalPhoto image={item.image4} />}
                {item.image5 && <ItemAdditionalPhoto image={item.image5} />}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ItemClient
