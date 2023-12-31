"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  multiline?: boolean
  register: (...args: any) => any // Adjust this to the correct type signature from react-hook-form.
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  multiline,
  register,
  errors,
}) => {
  // Choose the component type dynamically
  const Component = multiline ? 'textarea' : 'input'

  return (
    <div className="w-full relative ">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-netural-700 absolute top-8 left-2"
        />
      )}

      {/* multiline or singleline */}
      <Component
        id={id}
        type={type}
        disabled={disabled}
        placeholder=" "
        {...register(id, { required })}
        className={`peer w-full p-4 pt-8 font-light bg-white border-2 rounded-2xl outline-none overflow-auto
                        transition disabled:opacity-50 disabled:cursor-not-allowed 
                        ${formatPrice ? 'pl-9' : 'pl-4'}
                        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                        ${
                          errors[id]
                            ? 'focus:border-rose-500'
                            : 'focus:border-[#00274C]'
                        }`}
      />

      <label
        className={`absolute text-md font-bold duration-150 transform -translate-y-3 top-6 z-10 origin-[0] bg-white
                       ${formatPrice ? 'left-9' : 'left-4'}
                       peer-placeholder-shown:scale-100
                       peer-placeholder-shown:translate-y-0
                       peer-focus:scale-75
                       peer-focus:-translate-y-4
                       ${errors[id] ? 'text-rose-500' : 'border-zinc-300'}`}
      >
        {label}
      </label>
    </div>
  )
};

export default Input;
