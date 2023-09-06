'use client';

import Image from 'next/image'

import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter();

  return (
    // <a
    //   href='/'
    //   className='flex flex-row items-center'>
    //   <Image
    //     alt='logo'
    //     src= '/images/michigan.png'
    //     className='hidden md:block cursor-pointer'
    //     height='70'
    //     width='70'
    //   />
    //   <h1 className='ml-2 text-3xl text-[#00274C] font-extrabold cursor-pointer'>MTSA Marketplace</h1>
    // </a>
    <Image
        alt='logo'
        src= '/images/marketplace-color-logo.png'
        className='block cursor-pointer pl-2'
        height='60'
        width='280'
      />
  )
}

export default Logo
