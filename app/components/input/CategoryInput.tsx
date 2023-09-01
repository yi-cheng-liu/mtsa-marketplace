'use client'

import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  onClick: (value: string) => void;
  selected?: boolean;
  icon: IconType;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  onClick,
  selected,
  icon: Icon
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col items-center justify-center border-2 p-2 
      rounded-3xl cursor-pointer transition  hover:border-[#00274C]
      ${selected ? 'border-[#00274C]' : 'border-netural-200'}
      ${selected ? 'bg-[#00274C15]' : 'bg-transparent'}`}
    >
      <Icon size={32} />
      <div className="font-bold mt-3">{label}</div>
    </div>
  )
}

export default CategoryInput
