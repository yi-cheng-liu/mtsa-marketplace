import { SafeUser } from '@/app/types'
import Avatar from '../Avatar'
import {
  MdOutlinePhone,
  MdOutlineMailOutline,
  MdOutlineHouse,
  MdOutlineCalendarToday,
  MdOutlineFacebook
} from 'react-icons/md'
import Heading from '../Heading'
import { useState } from 'react'
import UpdateButton from '../UpdateButton'
import { toast } from 'react-hot-toast'


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

  function getOneYearFromNowISO() {
    const currentDate = new Date()
    currentDate.setFullYear(currentDate.getFullYear() + 1)
    return currentDate.toISOString()
  }

  const [finalPickupDate, setFinalPickupDate] = useState(
    user?.finalPickupDate?.toISOString() || getOneYearFromNowISO()
  )
  const [facebookProfileLink, setFacebookProfileLink] = useState(
    user?.facebookProfileLink || undefined
  )

  function formatDate(isoString: string) {
    const date = new Date(isoString)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0') // +1 since getMonth() returns 0-11
    const year = date.getUTCFullYear()

    return `${month}/${day}/${year}`
  }

  function isValidFacebookLink(url: string) {
    const pattern = /^(https?:\/\/)?((www\.)?)facebook\.com\/[a-zA-Z0-9]+.*/i
    return pattern.test(url)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // Validate Facebook Link
    if (facebookProfileLink && !isValidFacebookLink(facebookProfileLink)) {
      toast.error('Updating error: The provided Facebook link is not valid.')
      return
    }

    const data = {
      phone,
      pickupAddress,
      finalPickupDate,
      facebookProfileLink
    }
    onUpdateUser(data)
  }

  return (
    <div className="py-6">
      {heading && <Heading title={heading} />}
      <div className="flex flex-col gap-6">
        {/* Name and Avatar */}
        <div className="text-xl font-semibold flex flex-row items-center gap-10">
          <div className="flex items-end gap-2">
            <Avatar src={user?.image} />
            <div className="flex text-lg font-semibold">{user?.name}</div>
          </div>
          {!profile && facebookProfileLink ? (
            <a
              href={facebookProfileLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdOutlineFacebook size={35} />
            </a>
          ) : (
            <></>
          )}
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
              <div className="flex items-center gap-2">
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
                  <div className="flex sm:w-[400px] w-[300px]">
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

            {/* Facebook Profile Link */}
            {profile ? (
              <div className="flex items-center gap-2">
                <MdOutlineFacebook size={26} />
                {profile ? (
                  <div>
                    <input
                      type="text"
                      value={facebookProfileLink}
                      onChange={(e)=>setFacebookProfileLink(e.target.value)}
                      className="p-1 sm:w-[400px] w-[300px] border-2 rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex sm:w-[400px] w-[300px]">
                    {facebookProfileLink}
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}

            {/* Update Button */}

            {profile ? (
              <UpdateButton label="Update" onClick={handleSubmit} />
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
