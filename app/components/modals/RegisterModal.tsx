'use client'

import axios from 'axios'
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { PiHandWavingBold } from 'react-icons/pi'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from '../../hooks/useRegisterModal'
import BlankModals from './BlankModals'
import Heading from '../Heading'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { useRouter } from 'next/navigation'

import { signIn } from 'next-auth/react'
  
const RegisterModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const handleNavigation = (path: string) => {
    router.push(path)
    registerModal.onClose()
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to marketplace"
        subtitle="Please register to continue"
        icon={PiHandWavingBold}
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
        <div className="text-[#00274C]">Already have an account?</div>
        <div
          onClick={toggle}
          className="text-[#00274C] font-bold cursor-pointer hover:opacity-50"
        >
          Login
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
        title="Register"
        body={bodyContent}
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
      />
    </div>
  )
}

export default RegisterModal
