'use client'

import { SafeUser, SafeItem } from "@/app/types";
import { Item, Reservation } from "@prisma/client";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";


interface ItemsCardProps {
  key: string;
  data: SafeItem;
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
            <HeartButton small itemId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div className="text-neutral-500">{data.category}</div>
        <div className="flex flex-row items-center justify-start gap-1">
          <div className="flex font-bold text-green-600">$</div>
          <div className="flex text-neutral-500">
            {data.price === 0 ? "FREE" : data.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsCard
