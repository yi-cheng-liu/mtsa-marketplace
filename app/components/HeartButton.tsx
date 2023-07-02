'use client'

import { SafeUser } from "../types";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
  itemId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ itemId, currentUser }) => {
  const { haveFavorited, toggleFavorite } = useFavorite({
    itemId,
    currentUser
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-50 transition cursor-pointer justify-start"
    >
      <BiBookmark size={24} className="absolute -right-[1px]" />
      <BiSolidBookmark
        size={22}
        className={`${haveFavorited ? "fill-rose-500" : "opacity-0"}`}
      />
    </div>
  );
}

export default HeartButton
