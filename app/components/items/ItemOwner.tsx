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

interface ItemOwnerProps {
  user: SafeUser;
  heading?: string;
}

const ItemOwner: React.FC<ItemOwnerProps> = ({user, heading}) => {
  return (
    <Container>
      {heading && <Heading title={heading} />}
      <div className="flex flex-col gap-6">
        {/* Name and Avatar */}
        <div className="text-xl font-semibold flex flex-row items-end gap-2">
          <Avatar src={user?.image} />
          <div className="flex text-lg font-semibold">{user?.name}</div>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-4">
          {user.phone && (
            <div className="flex items-center gap-2">
              <MdOutlinePhone size={24} />
              <div>{user?.phone}734-800-6477</div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MdOutlineMailOutline size={24} />
            <div>{user.email}</div>
          </div>
          {user.pickupAddress && (
            <div className="flex items-center gap-2">
              <MdOutlineHouse size={24} />
              <div>
                {user.pickupAddress}Apt 808b, 2200 Fuller Ct., Ann Arbor, MI
              </div>
            </div>
          )}
          {user.finalPickupDate && (
            <div className="flex items-center gap-2">
              <MdOutlineCalendarToday size={24} />
              <div className="flex flex-row justify-start items-center gap-2">
                <div className="">Pick up before</div>
                <div className="font-extrabold text-rose-500">
                  {user.finalPickupDate.toString()}2023-2-4
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ItemOwner
