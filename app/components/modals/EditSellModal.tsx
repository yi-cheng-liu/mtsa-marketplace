'use client'

import Modals from './Modals'

import useSellModal from '@/app/hooks/useSellModal'
import useEditSellModal from '@/app/hooks/useEditSellModal'
import Heading from '../Heading'

import { useMemo, useState } from 'react'
import { categories } from '../navbar/Categories'
import CategoryInput from '../input/CategoryInput'
import Input from '../input/Input'
import Counter from '../input/Counter'
import ImageUpload from '../input/ImageUpload'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { SafeItem, SafeUser } from '@/app/types'

enum EDITSELLMODALSTEPS {
  CATEGORY = 0,
  DETAILS = 1, // INFO, DESCRIPTION, PRICE
  IMAGES = 2
}

interface EditSellModalProps {
  item: SafeItem & {
    user: SafeUser
  }
}

const EditSellModal: React.FC<EditSellModalProps> = ({ item }) => {
  const router = useRouter()
  const editItemModal = useEditSellModal();

  // Keep track of the steps
  const [step, setStep] = useState(EDITSELLMODALSTEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      title: item.title,
      description: item.description,
      image: item.image,
      image2: item.image2,
      image3: item.image3,
      image4: item.image4,
      image5: item.image5,
      category: item.category,
      itemCount: item.itemCount,
      price: item.price
    }
  })

  const category = watch('category')
  const itemCount = watch('itemCount')
  const price = watch('price')
  const image = watch('image')
  const image2 = watch('image2')
  const image3 = watch('image3')
  const image4 = watch('image4')
  const image5 = watch('image5')

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
    if (price <= 1 && step == EDITSELLMODALSTEPS.DETAILS) {
      toast('The price is lower than 1 dollar! ', {
        icon: '💸',
        duration: 3500
      })
      return
    }
  }

  const onEdit: SubmitHandler<FieldValues> = async (data) => {
    console.log('Data sent for update:', data)

    if (step == EDITSELLMODALSTEPS.IMAGES && !image) {
      toast.error('Please upload at least one image')
      return
    }

    if (step !== EDITSELLMODALSTEPS.IMAGES) {
      return onNext()
    }
    setIsLoading(true)

    axios
      .put(`/api/items/${item.id}`, data)
      .then(() => {
        toast.success('Item updated successfully!', { icon: '🎉' })  // Modify the success message
        router.refresh()
        reset()
        setStep(EDITSELLMODALSTEPS.CATEGORY)
        editItemModal.onClose()
        router.refresh()
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const actionLabel = useMemo(() => {
    // Only the third page will have a create button
    if (step == EDITSELLMODALSTEPS.IMAGES) {
      return 'Done'
    }
    return 'Continue'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    // Only the first page will not have a back button
    if (step == EDITSELLMODALSTEPS.CATEGORY) {
      return undefined
    }
    return 'Back'
  }, [step])

  // 1. First Page
  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Pick a Category" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label}>
            <CategoryInput
              onClick={(category) => {
                setCustomValue('category', category)
              }}
              selected={category == item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  // 2. Second Page
  if (step == EDITSELLMODALSTEPS.DETAILS) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading title="Details of the item" center />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          multiline
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Counter
          title="Quantity"
          subtitle="How many items do you want to sell?"
          value={itemCount}
          onChange={(value) => {
            setCustomValue('itemCount', value)
          }}
        />
        <Input
          id="price"
          label="Price (per item)"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  // 3. Third Page
  if (step == EDITSELLMODALSTEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading title="Upload the Images" center />
        <ImageUpload
          onChange={(value) => setCustomValue('image', value)}
          value={image}
          main
        />
        <div className="flex flex-row justify-between gap-4">
          <ImageUpload
            onChange={(value) => setCustomValue('image2', value)}
            value={image2}
          />
          <ImageUpload
            onChange={(value) => setCustomValue('image3', value)}
            value={image3}
          />
        </div>
        <div className="flex flex-row justify-between gap-4">
          <ImageUpload
            onChange={(value) => setCustomValue('image4', value)}
            value={image4}
          />
          <ImageUpload
            onChange={(value) => setCustomValue('image5', value)}
            value={image5}
          />
        </div>
      </div>
    )
  }

  return (
    <Modals
      title="Edit the item"
      body={bodyContent}
      isOpen={editItemModal.isOpen}
      onClose={editItemModal.onClose}
      onSubmit={handleSubmit(onEdit)}
      actionLabel={actionLabel}
      secondaryAction={
        step === EDITSELLMODALSTEPS.CATEGORY ? undefined : onBack
      }
      secondaryActionLabel={secondaryActionLabel}
      actionDisabled={
        step === EDITSELLMODALSTEPS.CATEGORY ? !category : isLoading
      }
      disabled={isLoading}
    />
  )
}

export default EditSellModal
