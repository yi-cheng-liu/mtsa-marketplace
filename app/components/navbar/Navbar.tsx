'use client'

import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import UserMenu from './UserMenu'
import Categories from './Categories'

import { SafeUser } from '@/app/types/index'
import Searchbar from './Searchbar'

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="pt-4 border-b-2">
        <Container>
          <div className="flex flex-row items-center justify-between md:gap-0 gap-3">
            <Logo />
            <div className="hidden lg:block">
              <Searchbar />
            </div>
            <UserMenu currentUser={currentUser} />
          </div>
          <Categories />
        </Container>
      </div>
    </div>
  );
}

export default Navbar
