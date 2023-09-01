'use client'

import { ProgressBar } from "react-loader-spinner"

const Loader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <ProgressBar height={100} borderColor="#002747" barColor="#FFCB05" />
    </div>
  );
};

export default Loader;
