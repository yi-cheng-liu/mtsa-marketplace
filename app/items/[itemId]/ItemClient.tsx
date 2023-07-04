'use client'

import { SafeItem, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ItemHeading from "@/app/components/items/ItemHeading";
import ItemInfo from "@/app/components/items/ItemInfo";
import ItemAdditionalPhoto from "@/app/components/items/ItemAdditionalPhoto";

import useLoginModal from "@/app/hooks/useLoginModal";
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";

import { LocalizationProvider, DateTimePicker, StaticDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import Button from "@/app/components/Button";


interface ItemClientProps {
  reservations?: Reservation[];
  item: SafeItem & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ItemClient: React.FC<ItemClientProps> = ({ item, currentUser }) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const category = useMemo(() => {
    return categories.find((items) => items.label === item.category);
  }, [item.category]);

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
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [item?.id, selectedDate, router, currentUser, loginModal]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-8">
          <ItemHeading
            title={item.title}
            category={item.category}
            image={item.image}
            id={item.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-10 mt-6">
            <ItemInfo
              user={item.user}
              description={item.description}
              category={category}
            />
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

              {currentUser && currentUser.pickupAddress && (
                <div>
                  <hr className="border-[1px]" />
                  <div>
                    <div className="text-lg font-semibold">Pick Up Address</div>
                    <div>{currentUser.pickupAddress}</div>
                  </div>
                </div>
              )}

              <div className="flex">
                <Button
                  disabled={false}
                  label="Reserve & Buy"
                  onClick={onCreateReservation}
                />
              </div>
            </div>
          </div>

          {item.image2 || item.image3 || item.image4 || item.image5 ? (
            <>
              <hr className=" border-b-[1px]" />
              <div className="text-lg font-semibold">More Photo</div>
              <div className="grid grid-cols-2 gap-2 md:gap-4 xl:gap-6">
                {item.image2 && <ItemAdditionalPhoto image={item.image2} />}
                {item.image3 && <ItemAdditionalPhoto image={item.image3} />}
                {item.image4 && <ItemAdditionalPhoto image={item.image4} />}
                {item.image5 && <ItemAdditionalPhoto image={item.image5} />}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ItemClient
