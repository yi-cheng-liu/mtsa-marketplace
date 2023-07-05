"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import { SafeUser } from "@/app/types";
import ItemCategory from "./ItemCategory";
import ItemOwner from "./ItemOwner";

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
    <div className="col-span-7 flex flex-col gap-6">
      {/* Owner of the Item */}
      <ItemOwner user={user} onUpdateUser={() => {}} />

      {/* Category */}
      <hr className="border-[1px]" />
      {category && (
        <ItemCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}

      {/* Description */}
      <hr className="border-[1px]" />
      <div className="text-lg font-semibold">Description</div>
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
