'use client'

import { SafeUser } from "@/app/types";
import { Item, Reservation } from "@prisma/client";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";


interface ItemsCardProps {
  key: string;
  data: Item;
  reservation?: Reservation;
  currentUser?: SafeUser | null;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  onAction?: (id: string) => void;
}

const ItemsCard: React.FC<ItemsCardProps> = ({ key, data, reservation, currentUser, disabled, actionLabel, actionId="", onAction }) => {
  const router = useRouter();

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled)
      return;
    onAction?.(actionId);
  }, [onAction, actionId, disabled]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if(!reservation)
      return null;
    const pickup = new Date(reservation.pickupDate);

    return `${format(pickup, 'PP')}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/items/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-2xl">
          <Image
            fill
            alt="item image"
            src={data.image}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex mt-1 font-bold text-xl">{data.title}</div>
          <div className="flex">
            <HeartButton itemId={ data.id } currentUser={currentUser}/>
          </div>
        </div>
        

        <div className="font-semibold">{data.category}</div>

        <div className="">${data.price}</div>
      </div>
    </div>
  );
};

export default ItemsCard
