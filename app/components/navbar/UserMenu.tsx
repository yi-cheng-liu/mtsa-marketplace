'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from '../navbar/MenuItem'
import { useCallback, useState } from 'react'
import useRegisterModal from '../hooks/useRegisterModal'

const UserMenu = () => {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => { 
    setIsOpen((value) => !value)
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
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
            <Avatar />
          </div>
          <AiOutlineMenu />
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={() => {}} label="Login" />
              <MenuItem onClick={ registerModal.onOpen } label="Sign up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu
