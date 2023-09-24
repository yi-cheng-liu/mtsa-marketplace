'use client'

import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

import { SafeItem, SafeUser, SafeReservation } from '@/app/types'
import EmptyState from "@/app/components/EmptyState";
import Heading from '@/app/components/Heading'
import Container from '@/app/components/Container'
import ItemsCard from '@/app/components/items/ItemsCard'
import { CardMode } from '../types/constants'
import { EmptyStateMode } from "../types/constants";

interface PropertiesReservationClientProps {
  items: SafeItem[]
  reservations?: SafeReservation[]
  currentUser?: SafeUser | null
}

const PropertiesReservationClient: React.FC<
  PropertiesReservationClientProps
> = ({
  items,
  reservations,
  currentUser
}: PropertiesReservationClientProps) => {
  const router = useRouter()
  const [processingId, setProcessingId] = useState('')

  const handleItemDelete = useCallback(
    (id: string) => {
      axios
        .delete(`/api/items/${id}`)
        .then(() => {
          toast.success('Item deleted')
          router.refresh()
        })
        .catch((error) => {
          toast.error('Deleting item went wrong. Please try again.')
        })
    },
    [items]
  )

  const handleReservationCancel = useCallback(
    (id: string) => {
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled')
          router.refresh()
        })
        .catch(() => {
          toast.error('Cancelling item went wrong. Please try again.')
        })
    },
    [reservations]
  )

  const renderItemsSection = () => (  
    <div className="py-6">
      <Heading title="ALL ITEMS" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 xl:gap-6">
        {items &&
          items.map((item: any) => (
            <ItemsCard
              key={item.id}
              data={item}
              actionId={item.id}
              onAction={handleItemDelete}
              disabled={processingId === item.id}
              actionLabel="delete"
              currentUser={currentUser}
              mode={CardMode.PROFILE_ALL}
            />
          ))}
      </div>
    </div>
  )

  const renderReservationsSection = () => (
    <div className="py-6">
      <Heading title="RESERVED & SOLD ITEMS" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 xl:gap-6">
        {reservations &&
          reservations.map((reservation: any) => (
            <ItemsCard
              key={reservation.id}
              data={reservation.item}
              reservation={reservation}
              actionId={reservation.id}
              onAction={handleReservationCancel}
              disabled={processingId === reservation.id}
              actionLabel="cancel"
              currentUser={currentUser}
              mode={CardMode.PROFILE_RESERVED_SOLD}
            />
          ))}
      </div>
    </div>
  )

  return (
    <Container>
      {!items?.length && !reservations?.length ? (
        <>
          <Heading title="ALL ITEMS" />
          <EmptyState title="No Items" mode={EmptyStateMode.SECTION} />
        </>
      ) : (
        <>
          {items?.length > 0 && renderItemsSection()}
          {reservations && reservations?.length > 0 ? (
            renderReservationsSection()
          ) : (
            <div className="py-6">
              <Heading
                title="RESERVED & SOLD ITEMS"
              />
              <EmptyState
                title="No Reserved Items"
                mode={EmptyStateMode.SECTION}
              />
            </div>
          )}
        </>
      )}
    </Container>
  )
}

export default PropertiesReservationClient
