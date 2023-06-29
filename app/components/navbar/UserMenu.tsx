'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from '../navbar/MenuItem'
import { useCallback, useState } from 'react'
import useLoginModal from '../../hooks/useLoginModal'
import useRegisterModal from '../../hooks/useRegisterModal'
import LoginModal from '../modals/LoginModal'
import { User } from '@prisma/client'
import { SafeUser } from '@/app/types'
import { signOut } from 'next-auth/react'

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => { 
    setIsOpen((value) => !value)
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {currentUser && (
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-[#00274C]">Go Blue!</div>
            <div className="text-sm font-bold ml-2 text-[#00274C]">
              {currentUser.name}
            </div>
          </div>
        )}

        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-2xl hover:bg-neutral-200 transition cursor-pointer"
        >
          Add an item
        </div>

        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-spacing-0 border-[2px] flex flex-row items-center gap-3 rounded-2xl cursor-pointer hover:shadow-md transition"
        >
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
          <AiOutlineMenu />
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={loginModal.onOpen} label="My orders" />
                <MenuItem onClick={loginModal.onOpen} label="My items" />
                <MenuItem onClick={loginModal.onOpen} label="Profile" />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu
