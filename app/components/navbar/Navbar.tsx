'use client'

import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import UserMenu from './UserMenu'

const Navbar = () => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-2'>
        <Container>
          <div className='flex flex-row items-center justify-between md:gap-0 gap-3'>
            <Logo />
            <UserMenu />
          </div>
        </Container>
      </div>
      
    </div>
  )
}

export default Navbar
