'use client'

import Image from 'next/image'

interface AvatarProps {
  src?: string | null | undefined
  small?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ src, small }) => {
  const dimensions = small
    ? { height: 25, width: 25 }
    : { height: 35, width: 35 }

  return (
    <Image
      alt="avatar"
      src={src || '/images/avatar.jpg'}
      className="rounded-full"
      {...dimensions}
    />
  )
}

export default Avatar
