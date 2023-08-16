import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "../components/Container";
import Heading from "../components/Heading";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import getItems from "../actions/getItems";

import ItemOwner from "@/app/components/items/ItemOwner";
import PropertiesClient from "@/app/profile/PropertiesClient";
import ReservationsClient from "./ReservationsClient";
import ProfileClient from "./ProfileClient";

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
  const {items} = await getItems({ userId: currentUser.id });

  if (reservations.length === 0 && items.length === 0) {
    return (
      <ClientOnly>
        <ProfileClient currentUser={currentUser} />
        <Container>
          <Heading title="All Items" />
          <EmptyState profile title="No Items" />
        </Container>
      </ClientOnly>
    );
  }
  
  else if (reservations.length === 0) {
    return (
      <ClientOnly>
        <ProfileClient currentUser={currentUser} />
        <PropertiesClient items={items} currentUser={currentUser} />
        <Container>
          <Heading title="Reserved Items" />
          <EmptyState profile title="No Reserved Items" />
        </Container>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ProfileClient currentUser={currentUser} />
      <PropertiesClient
        items={items}
        currentUser={currentUser} />
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ProfilePage;
