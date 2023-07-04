import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import getItems from "../actions/getItems";

import ReservationsClient from "./ReservationsClient";
import PropertiesClient from "@/app/properties/PropertiesClient";

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
  const items = await getItems();

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="You don't have any reserved items" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient items={items} currentUser={currentUser} />
      <ReservationsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ReservationsPage;
