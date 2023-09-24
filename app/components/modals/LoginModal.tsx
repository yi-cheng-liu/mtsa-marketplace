'use client'

import { signIn } from 'next-auth/react'
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FaRegLaughSquint } from "react-icons/fa";
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '../../hooks/useRegisterModal'
import BlankModals from './BlankModals'
import Heading from '../Heading'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { useRouter } from 'next/navigation'
  
const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const handleNavigation = (path: string) => {
    router.push(path);
    loginModal.onClose();
  }
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back to marketplace"
        subtitle="Please login to continue"
        icon={FaRegLaughSquint}
        center
      />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="flex flex-row justify-center items-center gap-2">
        <div className="flex text-[#00274C]">Don&apos;t have an account?</div>
        <div
          onClick={toggle}
          className="text-[#00274C] font-bold cursor-pointer hover:opacity-50"
        >
          Register
        </div>
      </div>
      <div className="flex justify-center text-sm">
        View our
        <span
          className="mx-1 hover:font-bold cursor-pointer"
          onClick={() => handleNavigation('/about/privacy-policy')}
        >
          Privacy Policy
        </span>
        or
        <span
          className="mx-1 hover:font-bold cursor-pointer"
          onClick={() => handleNavigation('/about/terms-of-use')}
        >
          Terms of Use
        </span>
      </div>
    </div>
  )
  
  return (
    <div>
      <BlankModals
        title="Login"
        body={bodyContent}
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
      />
    </div>
  )
}

export default LoginModal
