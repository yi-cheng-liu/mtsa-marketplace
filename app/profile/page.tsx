import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "../components/Container";
import Heading from "../components/Heading";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import getItems from "../actions/getItems";

import { EmptyStateMode } from "../types/constants";
import ProfileClient from "./ProfileClient";
import PropertiesReservationClient from "./PropertiesReservationClient";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized !! Please login"
          mode={EmptyStateMode.FULL_PAGE}
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id })
  const items = (await getItems({ userId: currentUser.id })).items

  return (
    <ClientOnly>
      <ProfileClient currentUser={currentUser} />
      <PropertiesReservationClient
        items={items}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
};

export default ProfilePage;
