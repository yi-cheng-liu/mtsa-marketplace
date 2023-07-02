'use client'

import Modals from './Modals'

import useSellModal from '@/app/hooks/useSellModal'
import Heading from '../Heading'

import { useMemo, useState } from 'react'
import { categories } from '../navbar/Categories'
import CategoryInput from '../input/CategoryInput'
import Input from '../input/Input'
import Counter from '../input/Counter'
import ImageUpload from '../input/ImageUpload'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

enum SELLMODALSTEPS {
  CATEGORY = 0,
  DETAILS = 1, // INFO, DESCRIPTION, PRICE
  IMAGES = 2,
}


const SellModal = () => {
  const router = useRouter();
  const itemModal = useSellModal();

  const [step, setStep] = useState(SELLMODALSTEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset, }
    = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      image2: "",
      image3: "",
      image4: "",
      image5: "",
      category: "",
      itemCount: 1,
      price: 1.00,
    },
  });

  const category = watch("category");
  const title = watch("title");
  const description = watch("description");
  const itemCount = watch("itemCount");
  const price = watch("price");
  const image = watch("image");
  const image2 = watch("image2");
  const image3 = watch("image3");
  const image4 = watch("image4");
  const image5 = watch("image5");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
    if (price <= 1 && step === SELLMODALSTEPS.DETAILS) {
      toast("The price is lower than 1 dollar! ",
        { icon: "💸", duration: 3500 });
      return;
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if(step != SELLMODALSTEPS.IMAGES) {
      return onNext();
    }
    setIsLoading(true);

    axios.post('/api/items', data)
      .then(() => {
        toast.success('Item created successfully!', { icon: "🎉" });
        router.refresh();
        reset();
        setStep(SELLMODALSTEPS.CATEGORY);
        itemModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const actionLabel = useMemo(() => {
    if (step == SELLMODALSTEPS.IMAGES) {
      return "Create";
    }
    return "Continue";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step == SELLMODALSTEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Pick a Category" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label}>
            <CategoryInput
              onClick={(category) => {
                setCustomValue("category", category);
              }}
              selected={category == item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step == SELLMODALSTEPS.DETAILS) {
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
          onChange={(value) => { setCustomValue('itemCount', value); }}
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
    );
  }

  if (step == SELLMODALSTEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading title="Upload the Images" center />
        <ImageUpload
          onChange={(value) => setCustomValue("image", value)}
          value={image}
          main
        />
        <div className="flex flex-row justify-between gap-4">
          <ImageUpload
            onChange={(value) => setCustomValue("image2", value)}
            value={image2}
          />
          <ImageUpload
            onChange={(value) => setCustomValue("image3", value)}
            value={image3}
          />
        </div>
        <div className="flex flex-row justify-between gap-4">
          <ImageUpload
            onChange={(value) => setCustomValue("image4", value)}
            value={image4}
          />
          <ImageUpload
            onChange={(value) => setCustomValue("image5", value)}
            value={image5}
          />
        </div>
      </div>
    );
  }

  return (
    <Modals
      title="Add an item"
      body={bodyContent}
      isOpen={itemModal.isOpen}
      onClose={itemModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryAction={step === SELLMODALSTEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      disabled={!category}
    />
  );
}

export default SellModal
