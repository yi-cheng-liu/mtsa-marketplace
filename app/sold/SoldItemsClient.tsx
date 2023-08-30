'use client'

import { SafeReservation, SafeUser } from '@/app/types'

import Heading from '@/app/components/Heading'
import Container from '@/app/components/Container'
import ItemsCard from '@/app/components/items/ItemsCard'

import { CardMode } from '@/app/types/constants'


interface SoldItemsClientProps {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
}

const SoldItemsClient: React.FC<SoldItemsClientProps> = ({
  reservations,
  currentUser
}) => {
  return (
    <Container>
      <div className="py-6">
        <Heading title="SOLD ITEMS" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 xl:gap-6">
          {reservations.map((reservation: any) => (
            <ItemsCard
              key={reservation.id}
              data={reservation.item}
              reservation={reservation}
              actionId={reservation.id}
              // actionLabel="cancel"
              // onAction={onCancel}
              currentUser={currentUser}
              mode={CardMode.SOLD}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default SoldItemsClient
