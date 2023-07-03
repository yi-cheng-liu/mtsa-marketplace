'use client'

import { SafeItem, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ItemHeading from "@/app/components/items/ItemHeading";
import ItemInfo from "@/app/components/items/ItemInfo";
import ItemAdditionalPhoto from "@/app/components/items/ItemAdditionalPhoto";

import { TextField } from "@mui/material";
import { LocalizationProvider, DateTimePicker, StaticDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";


interface ItemClientProps {
  reservations?: Reservation[];
  item: SafeItem & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}
const ItemClient: React.FC<ItemClientProps> = ({ item, currentUser }) => {
    const category = useMemo(() => {
      return categories.find((items) => items.label === item.category);
    }, [item.category]);

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
            <div className="col-span-5 flex flex-col gap-14">
              <div className="flex flex-col gap-4">
                <div className="text-lg font-semibold">Price</div>
                <div className="flex flex-row justify-between">
                  <div className="text-netural-500">
                    {item.itemCount} * {item.price.toFixed(2)}
                  </div>
                  <div>{(item.itemCount * item.price).toFixed(2)}</div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="text-lg font-semibold">Pick Up Date & Time</div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker defaultValue={dayjs()} />
                </LocalizationProvider>
              </div>
            </div>
          </div>

          {item.image2 || item.image3 || item.image4 || item.image5 ? (
            <>
              <hr className=" border-b-[1px]" />
              <div className="text-lg font-semibold">More Photo</div>
              <div className="grid grid-cols-2 gap-2 md:gap-4 xl:gap-6">
                <ItemAdditionalPhoto image={item.image2} />
                <ItemAdditionalPhoto image={item.image3} />
                <ItemAdditionalPhoto image={item.image4} />
                <ItemAdditionalPhoto image={item.image5} />
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
