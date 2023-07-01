'use client'

import { IconType } from "react-icons";

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  icon: IconType;
}

const CategoryInput: React.FC<CategoryInputProps> = ({onClick, selected, label, icon: Icon}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col items-center justify-center border-2 p-2 rounded-xl cursor-pointer transition hover:border-[#00274C]
      ${selected ? "border-[#00274C]" : "border-netural-200"}`}
    >
      <Icon size={32} />
      <div className="font-extrabold mt-2">
        {label}
      </div>
    </div>
  );
}

export default CategoryInput
