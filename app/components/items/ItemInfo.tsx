"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ItemCategory from "./ItemCategory";
import {
  MdOutlinePhone,
  MdOutlineMailOutline,
  MdOutlineHouse,
  MdOutlineCalendarToday,
} from "react-icons/md";


interface ItemInfoProps {
  user: SafeUser;
  description: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}

const ItemInfo: React.FC<ItemInfoProps> = ({ user, description, category }) => {
  return (
    <div className="col-span-4 flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        {/* Name and Avatar */}
        <div className="text-xl font-semibold flex flex-row items-end gap-2">
          <Avatar src={user?.image} />
          <div className="flex">{user?.name}</div>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-4">
          {user.phone && (
            <div className="flex items-center gap-2">
              <MdOutlinePhone size={24} />
              <div>{user?.phone}734-800-6477</div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MdOutlineMailOutline size={24} />
            <div>{user.email}</div>
          </div>
          {user.pickupAddress && (
            <div className="flex items-center gap-2">
              <MdOutlineHouse size={24} />
              <div>
                {user.pickupAddress}Apt 808b, 2200 Fuller Ct., Ann Arbor, MI
              </div>
            </div>
          )}
          {user.finalPickupDate && (
            <div className="flex items-center gap-2">
              <MdOutlineCalendarToday size={24} />
              <div className="flex flex-row justify-start items-center gap-2">
                <div className="">Pick up before</div>
                <div className="font-extrabold text-rose-500">
                  {user.finalPickupDate.toString()}2023-2-4
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className="border-[1px]" />
      {category && (
        <ItemCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr className="border-[1px]" />
      <div className="text-bold text-xl">Description</div>
      {description && (
        <>
          <div className="text-lg font-light text-neutral-500 whitespace-normal overflow-wrap break-words">
            {description.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ItemInfo;
