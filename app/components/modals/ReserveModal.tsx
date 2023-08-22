import { useState, useCallback } from 'react'

import Modals from './Modals'
import useLoginModal from '@/app/hooks/useLoginModal';
import useReserveModal from '@/app/hooks/useReserveModal'
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SafeUser, SafeItem } from '@/app/types'
import Heading from '../Heading'
import { MdOutlineCalendarToday, MdOutlineHouse } from 'react-icons/md'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import Button from '@/app/components/Button'

interface ReserveModalProps {
  item: SafeItem & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
  selectedDate: dayjs.Dayjs | null
}

const ReserveModal: React.FC<ReserveModalProps> = ({
  item,
  currentUser, 
  selectedDate
}) => {
  const reserveModal = useReserveModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const formattedDate = selectedDate?.format('MM/DD/YYYY HH:mm')


  const bodyContent = (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <Heading title={item.title} center />
      <div className="flex flex-col justify-between items-start gap-4">
        {/* Price */}
        <div className="flex items-center gap-2">
          <RiMoneyDollarCircleLine size={24} />
          <div className="font-bold">Price: </div>
          <div className="flex flex-row justify-between text-neutral-500 gap-3">
            <div className="flex flex-row justify-start gap-1">
              <div>
                {item.itemCount} {item.itemCount > 1 ? 'items' : 'item'}
              </div>
              <div className="mx-2">*</div>
              <div className="font-bold text-green-600">$</div>
              <div>{item.price.toFixed(2)}</div>
            </div>
            <div>=</div>
            <div className="flex flex-row justify-start gap-1">
              <div className="font-bold text-green-600">$</div>
              <div>{(item.itemCount * item.price).toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-center gap-2">
          <MdOutlineCalendarToday size={24} />
          <div className="flex flex-row justify-start items-center gap-2">
            <div className="font-bold">Pick up time: </div>
            <div className="font-extrabold text-rose-500">
              {selectedDate ? <>{formattedDate}</> : <></>}
            </div>
          </div>
        </div>

        {/* Pickup Address */}
        <div className="flex items-center gap-2">
          <MdOutlineHouse size={24} />
          <div className="flex flex-row justify-start items-center gap-2">
            <div className="font-bold">Address: </div>
            <div className="text-neutral-500">
              {item.user.pickupAddress ? <>{item.user.pickupAddress}</> : <></>}
            </div>
          </div>
        </div>
      </div>
      <div>
        If the owner&apos;s Facebook profile page is available, you can change
        the pick-up time by messaging them directly on Facebook Messanger.
      </div>
      <div>
        However, remember that only the <strong>owner</strong> can cancel the
        order.
      </div>
    </div>
  )

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }
    setIsLoading(true)
    axios
      .post('/api/reservations', {
        itemId: item?.id,
        pickupDate: selectedDate?.toISOString()
      })
      .then(() => {
        toast.success('Item reserved!')
        router.push('/')
      })
      .catch(() => {
        toast.error('Reserving item went wrong.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [item?.id, selectedDate, router, currentUser, loginModal])

  return (
    <div>
      <Modals
        title="Confirm the order"
        body={bodyContent}
        disabled={isLoading}
        isOpen={reserveModal.isOpen}
        onClose={reserveModal.onClose}
        actionLabel='Confirm'
        onSubmit={onCreateReservation}
        secondaryActionLabel='Cancel'
        secondaryAction={reserveModal.onClose}
      />
    </div>
    
  )
}

export default ReserveModal
