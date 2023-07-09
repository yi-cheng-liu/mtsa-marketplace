'use client'

import Image from 'next/image'

interface AvatarProps {
  src?: string | null | undefined;
  small?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ src, small }) => {
  return (
    <>
      {small?(
        <Image
        alt="avatar"
        src={src || "/images/avatar.jpg"}
        className="rounded-full"
        height="25"
        width="25"
      />
        ) : (
        <Image
        alt="avatar"
        src={src || "/images/avatar.jpg"}
        className="rounded-full"
        height="35"
        width="35"
      />
      )}
    </>
    
  );
};

export default Avatar
