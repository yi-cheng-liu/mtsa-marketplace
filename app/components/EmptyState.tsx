'use client'

import { TbMoodSadDizzy } from "react-icons/tb"

import Heading from "./Heading"
import { EmptyStateMode } from "@/app/types/constants"

interface EmptyStateProps {
  title: string
  mode: EmptyStateMode
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  mode
}) => {

  // Determine the mode
  const heightClassMapping = {
    [EmptyStateMode.HOME]: 'pt-28 h-[70vh]',
    [EmptyStateMode.FULL_PAGE]: 'h-[60vh]',
    [EmptyStateMode.SECTION]: 'h-[20vh]',
    [EmptyStateMode.EMPTY]: ''
  }
  const heightClass = heightClassMapping[mode]

  return (
    <div
      className={`flex flex-col gap-2 justify-center items-center ${heightClass}`}
    >
      <Heading center title={title} icon={TbMoodSadDizzy} />
    </div>
  )
}

export default EmptyState