'use client'

import axios from 'axios'
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '../hooks/useRegisterModal'
import Modals from './Modals'
  
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // turn on the loading indicator
    setIsLoading(true);
    axios
      .post("/api/register", data)
      // close the modal after successfully registering
      .then(() => {
        registerModal.onClose();
      })
      // print error message if there is any error
      .catch((error) => {
        console.log(error);
      })
      // turn off the loading indicator
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <Modals
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
         />
    </div>
  );
}

export default RegisterModal
