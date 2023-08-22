'use client'

import { SafeItem, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo, useCallback } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import Button from '@/app/components/Button'
import UpdateButton from '@/app/components/UpdateButton'
import ItemHeading from "@/app/components/items/ItemHeading";
import ItemInfo from "@/app/components/items/ItemInfo";
import ItemAdditionalPhoto from "@/app/components/items/ItemAdditionalPhoto";

import ItemReservation from "@/app/components/items/ItemReservation";
import useLoginModal from "@/app/hooks/useLoginModal";
import useEditSellModal from "@/app/hooks/useEditSellModal";
import EditSellModal from "@/app/components/modals/EditSellModal";
import useSellModal from "@/app/hooks/useSellModal";
import useReserveModal from "@/app/hooks/useReserveModal";

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

  const loginModal = useLoginModal();
  const sellModal = useSellModal();
  const editSellModal = useEditSellModal();
  const reserveModal = useReserveModal();

  const onEdit = useCallback(() => {
    console.log('onEdit is called') // Add this

    if (!currentUser) {
      return loginModal.onOpen()
    }

    // open the reserve confirm modal
    editSellModal.onOpen()

  }, [currentUser, loginModal, editSellModal])


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
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-10">
            {/* ItemInfo = ItemOwner + ItemCategory + Description */}
            <ItemInfo
              user={item.user}
              currentUser={currentUser}
              description={item.description}
              category={category}
            />
            <ItemReservation item={item} currentUser={currentUser} />
          </div>

          {item.image2 || item.image3 || item.image4 || item.image5 ? (
            <>
              <hr className=" border-b-[1px]" />
              <div className="text-lg font-semibold">More Photos</div>
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
          {(item.userId == currentUser?.id) ? (
            <div className="flex justify-center">
              <EditSellModal item={item} />
              <UpdateButton label="Edit" onClick={onEdit} center/>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Container>
  )
};

export default ItemClient
