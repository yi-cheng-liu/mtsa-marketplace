import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "../components/Container";
import Heading from "../components/Heading";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import getItems from "../actions/getItems";

import PropertiesClient from "@/app/profile/PropertiesClient";
import ReservationsClient from "./ReservationsClient";
import ProfileClient from "./ProfileClient";
import { EmptyStateMode } from "../types/constants";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized !! Please login"
          mode={EmptyStateMode.FULL_PAGE}
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });
  const {items} = await getItems({ userId: currentUser.id });

  // No items at all
  if (reservations.length === 0 && items.length === 0) {
    return (
      <ClientOnly>
        <ProfileClient currentUser={currentUser} />
        <Container>
          <Heading title="ALL ITEMS" />
          <EmptyState
            title="No Items"
            mode={EmptyStateMode.SECTION}
          />
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
          <EmptyState
            title="No Reserved Items"
            mode={EmptyStateMode.SECTION}
          />
        </Container>
      </ClientOnly>
    )
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
