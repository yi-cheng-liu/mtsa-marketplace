import EmptyState from '@/app/components/EmptyState'
import ClientOnly from '@/app/components/ClientOnly'
import Container from '@/app/components/Container'
import Heading from '../components/Heading'

import getCurrentUser from '@/app/actions/getCurrentUser'
import SoldItemsClient from './SoldItemsClient'
import getReservations from '../actions/getReservations'
import { EmptyStateMode } from '../types/constants'

const SoldItemPage = async () => {
  const reservations = await getReservations({})
  const currentUser = await getCurrentUser()
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <Container>
          <div className="py-6">
            <Heading title="SOLD ITEMS" />
            <EmptyState
              title="No sold items"
              mode={EmptyStateMode.FULL_PAGE}
            />
          </div>
        </Container>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <SoldItemsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default SoldItemPage
