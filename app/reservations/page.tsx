import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

// import TripsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized!! Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="You don't have any reserved items" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      Hi
    {/* <TripsClient reservations={reservations} currentUser={currentUser} /> */}
    </ClientOnly>
  );
};

export default ReservationsPage;
