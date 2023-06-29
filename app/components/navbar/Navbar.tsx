'use client'

import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import UserMenu from './UserMenu'

import { SafeUser } from '@/app/types/index'

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-2'>
        <Container>
          <div className='flex flex-row items-center justify-between md:gap-0 gap-3'>
            <Logo />
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>
      
    </div>
  )
}

export default Navbar
