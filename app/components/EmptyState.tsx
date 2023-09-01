'use client'

import { TbMoodSadDizzy } from "react-icons/tb"

import Heading from "./Heading"
import { EmptyStateMode } from "@/app/types/constants"

interface EmptyStateProps {
  title?: string
  mode: EmptyStateMode
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Items of this category',
  mode
}) => {

  // Determine the mode
  const heightClassMapping = {
    [EmptyStateMode.PROFILE]: 'h-[20vh]',
    [EmptyStateMode.HOME]: 'pt-28 h-[70vh]',
  }
  const heightClass = heightClassMapping[mode] || ''

  return (
    <div
      className={`flex flex-col gap-2 justify-center items-center ${heightClass}`}
    >
      <Heading center title={title} icon={TbMoodSadDizzy} />
    </div>
  )
}

export default EmptyState