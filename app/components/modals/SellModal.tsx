'use client'

import Modals from './Modals'

import useSellModal from '@/app/hooks/useSellModal'
import Heading from '../Heading'

import { useMemo, useState } from 'react'
import { categories } from '../navbar/Categories'
import CategoryInput from '../input/CategoryInput'

enum SellModalSteps {
  CATEGORY = 0, 
  DETAILS = 1, // INFO, DESCRIPTION, PRICE
  IMAGES = 2, 
}


const SellModal = () => {
  const itemModal = useSellModal();

  const [step, setStep] = useState(SellModalSteps.CATEGORY);

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const actionLabel = useMemo(() => {
    if (step == SellModalSteps.IMAGES) {
      return 'Create';
    }
    return 'Continue';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step == SellModalSteps.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading center title="Pick a Category" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[50vh] overflow-y-auto">
        {categories.map((category) => (
          <div key={category.label}>
            <CategoryInput
              onClick={() => {}}
              selected={false}
              label={category.label}
              icon={category.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );


  return (
    <Modals
      title="Add an item"
      body={bodyContent}
      isOpen={itemModal.isOpen}
      onClose={itemModal.onClose}
      onSubmit={itemModal.onClose}
      actionLabel={actionLabel}
      secondaryAction={secondaryActionLabel ? onBack : undefined}
      secondaryActionLabel={secondaryActionLabel}
    />
  )
}

export default SellModal
