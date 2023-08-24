'use client'

import { SafeUser, SafeItem } from '@/app/types'
import {
  LocalizationProvider,
  DateTimePicker,
  StaticDateTimePicker
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import Button from '@/app/components/Button'

import { useState, useCallback } from 'react'

import useLoginModal from '@/app/hooks/useLoginModal'
import useReserveModal from '@/app/hooks/useReserveModal'
import ReserveModal from '../modals/ReserveModal'

interface ItemReservationProps {
  item: SafeItem & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
}

const ItemReservation: React.FC<ItemReservationProps> = ({
  item,
  currentUser
}) => {
  const loginModal = useLoginModal()
  const reserveModal = useReserveModal()

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs())

  const onReserve = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    // open the reserve confirm modal
    reserveModal.onOpen()
  }, [currentUser, loginModal, reserveModal])

  return (
    <div className="col-span-5 flex flex-col justify-between gap-6 py-4">
      <hr className="border-[1px] sm:hidden" />
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold">Price</div>
        <div className="flex flex-row justify-between text-neutral-500">
          <div className="flex flex-row justify-start gap-1">
            <div>
              {item.itemCount} {item.itemCount > 1 ? 'items' : 'item'}
            </div>
            <div className="mx-2">*</div>
            <div className="font-bold text-green-600">$</div>
            <div>{item.price.toFixed(2)}</div>
          </div>
          <div className="flex flex-row justify-start gap-1">
            <div className="font-bold text-green-600">$</div>
            <div>{(item.itemCount * item.price).toFixed(2)}</div>
          </div>
        </div>
      </div>

      <hr className="border-[1px]" />
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold">Pick Up Date & Time</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            defaultValue={dayjs()}
            onChange={(newDate) => setSelectedDate(newDate)}
          />
        </LocalizationProvider>
      </div>

      <hr className="border-[1px]" />
      {item.user && item.user.pickupAddress && (
        <div className="flex flex-col gap-4">
          <div className="text-lg font-semibold">Pick Up Address</div>
          <div className="text-neutral-500">{item.user.pickupAddress}</div>
        </div>
      )}

      <ReserveModal
        item={item}
        currentUser={currentUser}
        selectedDate={selectedDate}
      />
      <div className="flex">
        <Button disabled={false} label="Reserve & Buy" onClick={onReserve} />
      </div>
    </div>
  )
}

export default ItemReservation
