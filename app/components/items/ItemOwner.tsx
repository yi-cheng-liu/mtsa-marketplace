import { SafeUser } from '@/app/types'
import Avatar from '../Avatar'
import {
  MdOutlinePhone,
  MdOutlineMailOutline,
  MdOutlineHouse,
  MdOutlineCalendarToday
} from 'react-icons/md'
import Container from '../Container'
import Heading from '../Heading'
import { useState } from 'react'
import Button from '../Button'

interface ItemOwnerProps {
  user: SafeUser
  currentUser?: SafeUser | null
  heading?: string
  profile?: boolean
  onUpdateUser: (data: any) => void
}

const ItemOwner: React.FC<ItemOwnerProps> = ({
  user,
  currentUser,
  heading,
  profile,
  onUpdateUser
}) => {
  const [phone, setPhone] = useState(user?.phone || '')
  const [pickupAddress, setPickupAddress] = useState(user?.pickupAddress || '')
  const [finalPickupDate, setFinalPickupDate] = useState(
    user?.finalPickupDate?.toISOString() || ''
  )

  function formatDate(isoString: string) {
    const date = new Date(isoString)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0') // +1 since getMonth() returns 0-11
    const year = date.getUTCFullYear()

    return `${month}/${day}/${year}`
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const data = {
      phone,
      pickupAddress,
      finalPickupDate
    }
    onUpdateUser(data)
  }

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
          <div className="flex flex-col gap-4">
            {/* Phone */}
            {(user.phone || profile) && (
              <div className="flex items-center gap-2">
                <MdOutlinePhone size={24} />
                {profile ? (
                  <div>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="p-1 sm:w-[400px] w-[300px] border-2 rounded-lg"
                    />
                  </div>
                ) : (
                  <div>{user.phone}</div>
                )}
              </div>
            )}

            {/* Email */}
            <div className="flex items-center gap-2">
              <MdOutlineMailOutline size={24} />
              <div>{user.email}</div>
            </div>

            {/* Pickup Address */}
            {(user.pickupAddress || profile) && (
              <div className="flex flex-wrap items-center gap-2">
                <MdOutlineHouse size={26} />
                {profile ? (
                  <div>
                    <input
                      type="text"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      className="p-1 sm:w-[400px] w-[300px] border-2 rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex flex-wrap sm:w-[400px] w-[300px]">
                    {pickupAddress}
                  </div>
                )}
              </div>
            )}

            {/* Final Pickup Date */}
            {(user.finalPickupDate || profile) && (
              <div className="flex items-center gap-2">
                <MdOutlineCalendarToday size={24} />
                <div className="flex flex-row justify-start items-center gap-2">
                  <div className="font-bold">Pick up before: </div>
                  <div className="font-extrabold text-rose-500">
                    <div>{formatDate(finalPickupDate)}</div>
                  </div>
                </div>
              </div>
            )}
            {profile && (
              <div className="flex items-center gap-2">
                <div>Change final pick up date to:</div>
                <input
                  type="date"
                  value={finalPickupDate}
                  onChange={(e) => setFinalPickupDate(e.target.value)}
                  className="p-1 border-2 rounded-lg"
                />
              </div>
            )}

            {/* Update Button */}
            {profile ? (
              <div className="justify-start">
                <button
                  onClick={handleSubmit}
                  className="text-netural-500 rounded-2xl px-4 border-2 border-netural-500"
                >
                  Update
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ItemOwner
