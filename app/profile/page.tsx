import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "../components/Container";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import getItems from "../actions/getItems";

import ItemOwner from "@/app/components/items/ItemOwner";
import PropertiesClient from "@/app/properties/PropertiesClient";
import ReservationsClient from "./ReservationsClient";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized!! Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });
  const items = await getItems({ userId: currentUser.id });

  if (reservations.length === 0 && items.length === 0) {
    return (
      <ClientOnly>
        <ItemOwner user={currentUser} />
        <EmptyState title="No items" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <ItemOwner user={currentUser} heading="Profile" />
      </Container>
      <PropertiesClient items={items} currentUser={currentUser} />
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ProfilePage;
