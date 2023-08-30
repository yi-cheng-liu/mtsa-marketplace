'use client'

import React from 'react'
import UpdateButton from '../UpdateButton'
import { useRouter } from 'next/navigation'

const SoldButton = () => {
  const router = useRouter()
  return (
    <>
      <UpdateButton
        label="Load sold items..."
        onClick={() => router.push('/sold')}
        center
      />
    </>
  )
}

export default SoldButton
