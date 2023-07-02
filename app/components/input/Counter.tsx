"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col ml-2">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="
            w-10
            h-10
            flex
            items-center
            justify-center
            text-[#002747]
            cursor-pointer
            hover:opacity-60
            transition
          "
        >
          <AiOutlineMinus size={30}/>
        </div>
        <div
          className="
            font-light 
            text-xl 
            text-neutral-600
          "
        >
          {value}
        </div>
        <div
          onClick={onAdd}
          className="
            w-10
            h-10
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlinePlus size={30} />
        </div>
      </div>
    </div>
  );
};

export default Counter;
