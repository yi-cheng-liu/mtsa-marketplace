'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from '../navbar/MenuItem'
import { useCallback, useState } from 'react'
import useSellModal from '@/app/hooks/useSellModal'
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from '@/app/types'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'


interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const sellModal = useSellModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const toggleOpen = useCallback(() => { 
    setIsOpen((value) => !value)
  }, []);

  const onSell = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // open the item modal
    sellModal.onOpen();
  }, [currentUser, loginModal, sellModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {currentUser && (
          <div className="flex items-center justify-between">
            <div className="hidden md:block lg:text-base text-sm font-semibold text-[#00274C]">
              Go Blue!
            </div>
            <div className="hidden md:block md:text-base text-sm font-bold ml-2 text-[#00274C]">
              {currentUser.name}
            </div>
          </div>
        )}

        <div
          onClick={onSell}
          className="hidden md:block lg:text-base text-sm font-semibold py-3 px-[14px] rounded-2xl hover:bg-neutral-200 transition cursor-pointer"
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
                <MenuItem onClick={sellModal.onOpen} label="Add an item" />
                <MenuItem
                  onClick={() => router.push("/orders")}
                  label="My orders"
                />
                <MenuItem
                  onClick={() => router.push("/saved")}
                  label="Saved" />
                <MenuItem
                  onClick={() => router.push("/profile")}
                  label="Profile"
                />
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
