'use client'

import React from 'react'
import UpdateButton from '../UpdateButton'
import { useRouter } from 'next/navigation'

const SoldButton = () => {
  const router = useRouter()
  return (
    <div className='p-6'>
      <UpdateButton
        label="Load sold items..."
        onClick={() => router.push('/sold')}
        center
      />
    </div>
  )
}

export default SoldButton
