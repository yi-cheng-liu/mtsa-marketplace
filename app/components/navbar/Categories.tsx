'use client'

import { TbToolsKitchen2 } from "react-icons/tb";
import { BiBed, BiBath, BiBookBookmark, BiCycling, BiDesktop, BiChair, BiCloset } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";
import { BsBookshelf } from "react-icons/bs";
import { MdOutlineFastfood, MdOutlineOtherHouses } from "react-icons/md";
import { TbShoe } from "react-icons/tb"
import { IoAmericanFootballOutline } from "react-icons/io5";
import CategoryBox from "../CategoryBox";
import { useSearchParams, usePathname } from "next/navigation";
import { PiCarBold } from "react-icons/pi";

export const categories = [
  {
    label: "Bedding",
    icon: BiBed,
    describtion: "",
  },
  {
    label: "Bath",
    icon: BiBath,
    describtion: "",
  },
  {
    label: "Clothes",
    icon: BiCloset,
    describtion: "",
  },
  {
    label: "Desk/Chair",
    icon: BiChair,
    describtion: "",
  },
  {
    label: "Shelf",
    icon: BsBookshelf,
    describtion: "",
  },
  {
    label: "Shoes",
    icon: TbShoe,
    describtion: "",
  },
  {
    label: "Lighting",
    icon: FaRegLightbulb,
    describtion: "",
  },
  {
    label: "Electronics",
    icon: BiDesktop,
    describtion: "",
  },
  {
    label: "Books",
    icon: BiBookBookmark,
    describtion: "",
  },
  {
    label: "Kitchenware",
    icon: TbToolsKitchen2,
    describtion: "This is kitchenware",
  },
  {
    label: "Food",
    icon: MdOutlineFastfood,
    describtion: "",
  },
  {
    label: "Bicycle",
    icon: BiCycling,
    describtion: "",
  },
  {
    label: "Sports",
    icon: IoAmericanFootballOutline,
    describtion: "",
  },
  {
    label: "Car",
    icon: PiCarBold,
    describtion: "",
  },
  {
    label: "Others",
    icon: MdOutlineOtherHouses,
    describtion: "",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname == '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between gap-1 overflow-x-auto">
      {categories.map((item) => (
        <CategoryBox
          key={item.label}
          label={item.label}
          icon={item.icon}
          selected={category == item.label}
        />
      ))}
    </div>
  )
}

export default Categories
