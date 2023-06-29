'use client';

import Image from 'next/image'

import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter();

  return (
    <div className='flex flex-row items-center'>
      <Image
        alt='logo'
        src= '/images/michigan.png'
        className='hidden md:block cursor-pointer'
        height='50'
        width='50'
      />
      <h1 className='ml-2 text-2xl font-bold'>MTSA marketplace</h1>
    </div>
    
    
  )
}

export default Logo
