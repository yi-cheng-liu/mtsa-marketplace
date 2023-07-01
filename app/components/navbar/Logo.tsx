'use client';

import Image from 'next/image'

import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/')}
      className='flex flex-row items-center'>
      <Image
        alt='logo'
        src= '/images/michigan.png'
        className='hidden md:block cursor-pointer'
        height='70'
        width='70'
      />
      <h1 className='ml-2 text-3xl font-extrabold cursor-pointer'>MTSA Marketplace</h1>
    </div>
    
    
  )
}

export default Logo
