"use client";

import Image from "next/image";

interface ItemAdditionalPhotoProps {
  image?: string | null;
}

const ItemAdditionalPhoto: React.FC<ItemAdditionalPhotoProps> = ({ image }) => {
  return (
    <div>
      {image && (
        <div className=" flex w-full h-[20vh] md:h-[30vh] lg:h-[40vh] overflow-hidden rounded-2xl relative">
          <Image
            fill
            src={image}
            alt={image}
            className="object-cover w-full"
          />
        </div>
      )}
    </div>
  );
};

export default ItemAdditionalPhoto;
