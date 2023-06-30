'use client'

import axios from 'axios'
import { signIn } from 'next-auth/react'
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FaRegLaughSquint } from "react-icons/fa";
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '../../hooks/useRegisterModal'
import Modals from './Modals'
import Heading from '../Heading'
import Input from '../input/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'
  
const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back to MTSA marketplace"
        subtitle="Please login to continue"
        icon={FaRegLaughSquint}
        center
      />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn('google')} />
      <Button outline label="Continue with Facebook" icon={AiFillFacebook} onClick={() => signIn('facebook')} />
      <Button outline label="Continue with Github" icon={AiFillGithub} onClick={()=> signIn('github')}/>
    </div>
  );

  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // turn on the loading indicator
    setIsLoading(true);
    signIn('credentials', { ...data, redirect: false })
      .then((callback) => {
        setIsLoading(false);
      
        if (callback?.ok) {
          toast.success("Login success");
          router.refresh();
          loginModal.onClose();
        }

        if(callback?.error) {
          toast.error(callback.error);
        }
      })
  }

  return (
    <div>
      <Modals
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        body={bodyContent}
        footer={footerContent}
        actionLabel="Login"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
         />
    </div>
  );
}

export default LoginModal
