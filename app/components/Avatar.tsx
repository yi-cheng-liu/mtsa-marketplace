'use client'

import Image from 'next/image'

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar:React.FC<AvatarProps> = ({src}) => {
  return (
    <Image
      alt="avatar"
      src={src || "/images/avatar.jpg"}
      className="rounded-full"
      height="35"
      width="35"
    />
  );
}

export default Avatar
