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
    description: "Bed sheets, pillows, comforters, mattress pads",
  },
  {
    label: "Bath",
    icon: BiBath,
    description: "Towels, bathrobes, bath mats, shower curtains",
  },
  {
    label: "Clothes",
    icon: BiCloset,
    description: "Shirts, pants, dresses, jackets, sweaters",
  },
  {
    label: "Desk/Chair",
    icon: BiChair,
    description: "Office chairs, study desks, desk lamps, stationery",
  },
  {
    label: "Shelf",
    icon: BsBookshelf,
    description: "Bookshelves, storage racks, display shelves",
  },
  {
    label: "Shoes",
    icon: TbShoe,
    description: "Sneakers, boots, sandals, high heels",
  },
  {
    label: "Lighting",
    icon: FaRegLightbulb,
    description: "Desk lamps, floor lamps, wall lamps, ceiling lights",
  },
  {
    label: "Electronics",
    icon: BiDesktop,
    description: "Computers, smartphones, TVs, headphones",
  },
  {
    label: "Books",
    icon: BiBookBookmark,
    description: "Novels, textbooks, cookbooks, comic books",
  },
  {
    label: "Kitchenware",
    icon: TbToolsKitchen2,
    description: "Pots, pans, cutlery, plates, glassware",
  },
  {
    label: "Food",
    icon: MdOutlineFastfood,
    description: "Canned food, spices, snacks, drinks",
  },
  {
    label: "Bicycle",
    icon: BiCycling,
    description: "Mountain bikes, road bikes, hybrid bikes, cycling gear",
  },
  {
    label: "Sports",
    icon: IoAmericanFootballOutline,
    description: "Footballs, baseball bats, tennis rackets, workout equipment",
  },
  {
    label: "Car",
    icon: PiCarBold,
    description: "Cars, car parts, car accessories, car cleaning supplies",
  },
  {
    label: "Others",
    icon: MdOutlineOtherHouses,
    description: "Items that don't fit into the other categories",
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
