"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") == label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-2 border-b-2 w-20 h-18
      hover:text-[#002747] hover:border-b-[#002747] transition cursor-pointer
      ${selected ? "border-b-[#002747]" : "border-transparent"}
      ${selected ? "text-[#002747]" : "text-neutral-500"}
    `}
    >
      <Icon size={28} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
