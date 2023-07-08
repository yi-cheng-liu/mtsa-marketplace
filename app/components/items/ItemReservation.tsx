"use client";

import { SafeUser, SafeItem } from "@/app/types";
import { Reservation } from "@prisma/client";
import { LocalizationProvider, DateTimePicker, StaticDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Button from "@/app/components/Button";

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";

import { toast } from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";



interface ItemReservationProps {
  reservations?: Reservation[];
  item: SafeItem & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ItemReservation: React.FC<ItemReservationProps> = ({
  reservations, item, currentUser
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
    dayjs()
  );

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);
    axios
      .post("/api/reservations", {
        itemId: item?.id,
        pickupDate: selectedDate?.toISOString(),
      })
      .then(() => {
        toast.success("Item reserved!");
        router.push("/");
      })
      .catch(() => {
        toast.error("Reserving item went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [item?.id, selectedDate, router, currentUser, loginModal]);
  return (
    <div className="col-span-5 flex flex-col justify-between gap-6 py-4">
      <hr className="border-[1px] sm:hidden" />
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold">Price</div>
        <div className="flex flex-row justify-between text-neutral-500">
          <div className="flex flex-row justify-start gap-1">
            <div>
              {item.itemCount} {item.itemCount > 1 ? "items" : "item"}
            </div>
            <div className="mx-2">*</div>
            <div className="font-bold text-green-600">$</div>
            <div>{item.price.toFixed(2)}</div>
          </div>
          <div className="flex flex-row justify-start gap-1">
            <div className="font-bold text-green-600">$</div>
            <div>{(item.itemCount * item.price).toFixed(2)}</div>
          </div>
        </div>
      </div>

      <hr className="border-[1px]" />
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold">Pick Up Date & Time</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            defaultValue={dayjs()}
            onChange={(newDate) => setSelectedDate(newDate)}
          />
        </LocalizationProvider>
      </div>

      {item.user && item.user.pickupAddress && (
        <>
          <hr className="border-[1px]" />
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-lg font-semibold">Pick Up Address</div>
              <div>{item.user.pickupAddress}</div>
            </div>
          </div>
        </>
      )}

      <div className="flex">
        <Button
          disabled={false}
          label="Reserve & Buy"
          onClick={onCreateReservation}
        />
      </div>
    </div>
  );
};

export default ItemReservation;
