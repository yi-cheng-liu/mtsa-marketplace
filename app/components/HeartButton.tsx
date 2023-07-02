'use client'

import { SafeUser } from "../types";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";

interface HeartButtonProps {
  itemId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ itemId, currentUser }) => {
  const haveFavorited = true;
  const toogleFavorite = () => { };

  return (
    <div
      onClick={toogleFavorite}
      className="relative hover:opacity-50 transition cursor-pointer justify-start"
    >
      <BiBookmark size={24} className="absolute -right-[1px]" />
      <BiSolidBookmark
        size={22}
        className={`${haveFavorited ? "fill-[#FFCB05]" : "opacity-0"}`}
      />
    </div>
  );
}

export default HeartButton
