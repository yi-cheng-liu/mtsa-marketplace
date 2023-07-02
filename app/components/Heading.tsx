'use client'

import { IconType } from "react-icons";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  icon?: IconType; // add a icon to the button
}

const Heading:React.FC<HeadingProps> = ({title, subtitle, center, icon:Icon}) => {
  return (
    <div
      className={`${
        center ? "flex flex-col items-center text-center" : "text-start"
      }`}
    >
      <div className="flex items-center mb-3">
        {Icon && <Icon size={32} className="mr-3" />}
        <div className="text-2xl font-bold">{title}</div>
      </div>
      <div className="text-lg text-neutral-500">{subtitle}</div>
    </div>
  );
}

export default Heading
