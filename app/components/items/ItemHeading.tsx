'use client'

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import SaveButton from "../SaveButton";

interface ItemClientProps{
  title: string;
  category: string;
  image: string;
  id: string;
  currentUser?: SafeUser | null;
}
const ItemHeading: React.FC<ItemClientProps> = ({title, category, image, id, currentUser}) => {
  return (
    <div className="flex flex-col mt-6 gap-4">
      <div className="flex justify-between items-center">
        <Heading title={title} subtitle={category} />
        <SaveButton itemId={id} currentUser={currentUser} />
      </div>
      <div className=" flex w-full h-[40vh] md:h-[55vh] lg:h-[70vh] overflow-hidden rounded-2xl relative">
        <Image fill src={image} alt={title} className="object-cover w-full" />
      </div>
    </div>
  );
}

export default ItemHeading
