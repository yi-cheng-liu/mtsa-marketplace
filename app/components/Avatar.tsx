'use client'

import Image from 'next/image'

const Avatar = () => {
  return (
    <Image
      alt="avatar"
      src="/images/avatar.jpg"
      className="rounded-full"
      height="30"
      width="30"
    />
  );
}

export default Avatar
