'use client'

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ItemClientProps{
  title: string;
  category: string;
  image: string;
  image2?: string | null;
  image3?: string | null;
  image4?: string | null;
  image5?: string | null;
  id: string;
  currentUser?: SafeUser | null;
}
const ItemHeading: React.FC<ItemClientProps> = ({title, category, image, image2, image3, image4, image5, id, currentUser}) => {
  return (
    <div className="mt-4">
      <Heading
        title={title}
        subtitle={category}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-2xl relative">
        <Image
          fill
          src={image}
          alt={title}
          className="object-cover w-full" />
        {/* <div>
          <HeartButton 
            itemId={id}
            currentUser={currentUser}
          />
        </div> */}
      </div>
    </div>
  )
}

export default ItemHeading
