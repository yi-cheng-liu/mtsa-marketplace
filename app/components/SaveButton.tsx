'use client'

import { SafeUser } from "../types";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";
import useFavorite from "../hooks/useFavorite";

interface SaveButtonProps {
  itemId: string;
  currentUser?: SafeUser | null;
  small?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  itemId,
  currentUser,
  small,
}) => {
  const { haveFavorited, toggleFavorite } = useFavorite({
    itemId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-50 transition cursor-pointer justify-start"
    >
      <BiBookmark
        size={`${small ? "24" : "34"}`}
        className="absolute -right-[1px]"
      />
      <BiSolidBookmark
        size={`${small ? "22" : "32"}`}
        className={`${haveFavorited ? "fill-[#00274C]" : "opacity-0"}`}
      />
    </div>
  );
};

export default SaveButton
