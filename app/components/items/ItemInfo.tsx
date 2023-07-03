"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";


interface ItemInfoProps {
  user: SafeUser;
  description: string;
  category?:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}

const ItemInfo: React.FC<ItemInfoProps> = ({ user, description, category }) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-end gap-2">
          <Avatar src={user?.image} />
          <div className="flex">{user?.name}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <AiOutlinePhone size={24} />
            <div>{user?.phone}734-800-6477</div>
          </div>
          <div className="flex items-center gap-2">
            <AiOutlineMail size={24} />
            <div>{user.email}</div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500"></div>
      </div>
      <div className="text-lg font-light text-neutral-500">
        {description}
      </div>
    </div>
  );
};

export default ItemInfo;
