'use client'

import { CldUploadWidget } from "next-cloudinary";
import Image from 'next/image';
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

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
            cursor-pointer hover:opacity-60 transition
            ${main ? "p-14 " : "p-8"}
            ${value ? "" : "border-dashed border-[1px] border-[#00274C] rounded-2xl"}`}
          >
            <TbPhotoPlus size={30} />
            <div className="font-semibold text-lg mt-4">Click to Upload</div>
            {!main && <div>optional</div>}

            {value && (
              <div className="absolute inset-0 w-full h-full rounded-2xl">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover", borderRadius: "inherit" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload
