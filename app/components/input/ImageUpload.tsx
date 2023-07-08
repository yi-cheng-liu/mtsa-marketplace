'use client'

import { CldUploadWidget } from "next-cloudinary";
import Image from 'next/image';
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps { 
  onChange: (value: string) => void;
  value: string;
  main?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value, main }) => {
  const handleUpload = useCallback((result: any) => { 
    onChange(result.info.secure_url);
  }, [onChange]);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    onChange("");
  };


  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="mtsa-marketplace-preset"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className={`flex flex-col relative items-center justify-center w-full
            cursor-pointer transition
            ${main ? "p-8 md:p-14 lg:p-20" : "p-2 md:p-6 lg:p-8"}
            ${
              value
                ? ""
                : "border-dashed border-[1px] border-[#00274C] rounded-2xl"
            }`}
          >
            <TbPhotoPlus size={30} />
            <div className="font-semibold lg:text-lg md:text-base text-sm mt-4">
              Click to Upload
            </div>
            {!main && (
              <div className="lg:text-lg md:text-base text-sm">optional</div>
            )}

            {value && (
              <div className="absolute inset-0 w-full h-full rounded-2xl">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover", borderRadius: "inherit" }}
                  src={value}
                />
                <button
                  onClick={handleRemove}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 font-extrabold
                  transition active:transform active:translate-y-1"
                >
                  <IoMdClose size={22} />
                </button>
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload
