
"use client"
import { getSingleUser } from "../lib/server_utils"
import { ShowUserDetails } from "./show_user"
import { AvatarByPic } from "./userAvatar"

export function AuthedUserAvatar({ user }: { user: Awaited<ReturnType<typeof getSingleUser>> }) {


  return (
    <>
      <div className="flex flex-col relative">
        <div className="" >

          {
            user.data?.profile?.username &&
            < AvatarByPic username={user.data?.profile?.username} profilePic={user.data?.profile?.profilePic} />}

        </div>
        <div className="absolute top-10 right-10" >
          {<ShowUserDetails user={user} />}
        </div>
      </div>
    </>
  )
}
