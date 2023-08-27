'use client'

import { SafeUser, SafeItem } from "@/app/types";
import { Item, Reservation } from "@prisma/client";
import Image from "next/image";
import SaveButton from "../SaveButton";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Button from "../Button"
import Avatar from "../Avatar";


interface ItemsCardProps {
  data: SafeItem & {
    user: SafeUser;
  };
  reservation?: Reservation & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  onAction?: (id: string) => void;
}


const ItemsCard: React.FC<ItemsCardProps> = ({ data, reservation, currentUser, disabled, actionLabel, actionId="", onAction }) => {

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (disabled)
      return;
    onAction?.(actionId);
  }, [onAction, actionId, disabled]);

  const reservationDate = useMemo(() => {
    if(!reservation) return null;
    const pickup = new Date(reservation.pickupDate);

    return `${format(pickup, 'PP')}`
  }, [reservation])

  const reservationTime = useMemo(() => {
    if (!reservation) return null;
    const pickup = new Date(reservation.pickupDate);

    return `${format(pickup, "p")}`;
  }, [reservation]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-2 w-full">
        <a
          href={`/items/${data.id}`}
          className="col-span-1 cursor-pointer group h-full"
        >
          <div className="aspect-square w-full relative overflow-hidden rounded-2xl">
            <Image
              fill
              alt="item image"
              src={data.image}
              className="object-cover h-full w-full group-hover:scale-110 transition"
            />
          </div>
        </a>
        <div className="relative">
          <a
            href={`/items/${data.id}`}
            className="col-span-1 cursor-pointer group h-full"
          >
            <div className="flex items-start">
              <div className="w-5/6 font-bold text-lg">{data.title}</div>
            </div>
            <div className="text-neutral-500">{data.category}</div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row justify-start gap-1">
                <div className="flex font-bold text-green-600">$</div>
                <div className="flex">
                  {data.price === 0 ? 'FREE' : data.price}
                </div>
              </div>
              <div className="pb-2">
                <Avatar small src={data.user?.image} />{' '}
              </div>
            </div>
          </a>
          <div className="absolute top-1 right-1">
            <SaveButton small itemId={data.id} currentUser={currentUser} />
          </div>
        </div>

        {reservationDate && (
          <div className="flex flex-col justify-start">
            <div>Pickup Info</div>
            <div className="flex flex-row justify-between">
              <div>Date: </div>
              <div className="text-red-500 font-semibold">
                {reservationDate}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>Time: </div>
              <div className="text-red-500 font-semibold">
                {reservationTime}
              </div>
            </div>
          </div>
        )}
        {reservation?.userId && (
          <div className="flex flex-col justify-start">
            <div>Buyer Info</div>
            <div className="flex flex-row justify-between gap-2">
              <div>Name: </div>
              <div className="flex text-right">
                {reservation.user.name}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex mt-auto">
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
};

export default ItemsCard
