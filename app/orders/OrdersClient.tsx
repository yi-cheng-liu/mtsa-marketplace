"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ItemsCard from "@/app/components/items/ItemsCard";
import { CardMode } from "../types/constants";

interface OrdersClientProps {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
}

const OrdersClient: React.FC<OrdersClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  // const onCancel = useCallback(
  //   (id: string) => {
  //     setDeletingId(id);

  //     axios
  //       .delete(`/api/reservations/${id}`)
  //       .then(() => {
  //         toast.success("Reservation cancelled");
  //         router.refresh();
  //       })
  //       .catch((error) => {
  //         toast.error(error?.response?.data?.error);
  //       })
  //       .finally(() => {
  //         setDeletingId("");
  //       });
  //   },
  //   [router]
  // );

  return (
    <Container>
      <div className="py-6">
        <Heading title="MY ORDERS" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 xl:gap-6">
          {reservations.map((reservation: any) => (
            <ItemsCard
              key={reservation.id}
              data={reservation.item}
              reservation={reservation}
              actionId={reservation.id}
              disabled={deletingId === reservation.id}
              // actionLabel="cancel"
              // onAction={onCancel}
              currentUser={currentUser}
              mode={CardMode.ORDER}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default OrdersClient;
