'use client'

import { SafeUser } from "@/app/types";
import { Item, Reservation } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";


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

const ItemsCard: React.FC<ItemsCardProps> = ({ key, data, reservation, currentUser, disabled, actionLabel, actionId, onAction }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className='aspect-square w-full relative overflow-hidden rounded-2xl'>
        <Image
          fill
          alt="item image"
          src={data.image}
          className="object-cover h-full w-full group-hover:scale-120 transition" />
        <div>
          
        </div>
      </div>
      
      <div className="font-semibold text-lg">
        List
      </div>
    </div>
  );
};

export default ItemsCard
