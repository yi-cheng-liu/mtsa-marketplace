import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import {
  MdOutlinePhone,
  MdOutlineMailOutline,
  MdOutlineHouse,
  MdOutlineCalendarToday,
} from "react-icons/md";
import Container from "../Container";
import Heading from "../Heading";
import { useState } from "react";
import Button from "../Button";

interface ItemOwnerProps {
  user: SafeUser;
  heading?: string;
  onUpdateUser: (data: any) => void;
}

const ItemOwner: React.FC<ItemOwnerProps> = ({ user, heading, onUpdateUser }) => {
  const [phone, setPhone] = useState(user?.phone || "");
  const [pickupAddress, setPickupAddress] = useState(user?.pickupAddress || "");
  const [finalPickupDate, setFinalPickupDate] = useState(
    user?.finalPickupDate?.toISOString() || ""
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      phone,
      pickupAddress,
      finalPickupDate,
    };
    onUpdateUser(data);
  };

  return (
    <div className="py-6">
      {heading && <Heading title={heading} />}
      <div className="flex flex-col gap-6">
        {/* Name and Avatar */}
        <div className="text-xl font-semibold flex flex-row items-end gap-2">
          <Avatar src={user?.image} />
          <div className="flex text-lg font-semibold">{user?.name}</div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Contact Information */}
          {/* Phone */}
          <div className="flex flex-col gap-4">
            {user.phone && (
              <div className="flex items-center gap-2">
                <MdOutlinePhone size={24} />
                <div>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="flex items-center gap-2">
              <MdOutlineMailOutline size={24} />
              <div>{user.email}</div>
            </div>

            {/* Pickup Address */}
            {user.pickupAddress && (
              <div className="flex items-center gap-2">
                <MdOutlineHouse size={24} />
                <div>
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Final Pickup Date */}
            {user.finalPickupDate && (
              <div className="flex items-center gap-2">
                <MdOutlineCalendarToday size={24} />
                <div className="flex flex-row justify-start items-center gap-2">
                  <div className="">Pick up before</div>
                  <div className="font-extrabold text-rose-500">
                    <input
                      type="date"
                      value={finalPickupDate}
                      onChange={(e) => setFinalPickupDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            <Button label="Update" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemOwner
