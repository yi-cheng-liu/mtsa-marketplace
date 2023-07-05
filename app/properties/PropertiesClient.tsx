"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeItem, SafeReservation, SafeUser } from "@/app/types";
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ItemsCard from "@/app/components/items/ItemsCard";

interface PropertiesClientProps {
  items?: SafeItem[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  items,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/items/${id}`)
        .then(() => {
          toast.success("Item deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <div className="py-6">
        <Heading title="All Items" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 md:gap-4 xl:gap-6">
          {items &&
            items.map((item: any) => (
              <ItemsCard
                key={item.id}
                data={item}
                actionId={item.id}
                onAction={onDelete}
                disabled={deletingId === item.id}
                actionLabel="delete"
                currentUser={currentUser}
              />
            ))}
        </div>
      </div>
    </Container>
  );
};

export default PropertiesClient;
