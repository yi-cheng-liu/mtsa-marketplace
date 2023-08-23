import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import Container  from "@/app/components/Container";
import Heading from "../components/Heading";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import OrdersClient from "./OrdersClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized ! " />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
          <Container>
          <div className="py-6">
            <Heading title="MY ORDERS" />
            <EmptyState title="No orders found" />
          </div>
        </Container>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <OrdersClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
