"use client";

import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { TbMoodSadDizzy } from "react-icons/tb";

import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  icon?: IconType;
  profile?: boolean;
  home?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Items of this category", icon, profile, home
}) => {
  return (
    <>
      {profile ? (
        <div className="h-[20vh] flex flex-col gap-2 justify-center items-center">
          <Heading center title={title} icon={TbMoodSadDizzy} />
        </div>
      ) : (
        <div
          className={`${
            home ? 'pt-28' : ''
          } h-[70vh] flex flex-col gap-2 justify-center items-center`}
        >
          <Heading center title={title} icon={TbMoodSadDizzy} />
        </div>
      )}
    </>
  )
};

export default EmptyState;
