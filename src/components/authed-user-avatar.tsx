
"use client"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { getSingleUser } from "@/lib/server_utils"
import { useSelector, useDispatch } from "react-redux"
import { setProfileDialog } from "@/featurs/navbar/navbarSlice"
import { RootState } from "../../store"
import { ShowProfile } from "./show-profile"

export function AuthedUserAvatar({ user }: { user: Awaited<ReturnType<typeof getSingleUser>> }) {

  const dispatch = useDispatch()
  const profileDialogState = useSelector((state: RootState) => state.navbarstate.isProfileDialogOpen)

  return (
    <>
      <div className="flex items-center relative ">
        <Avatar onClick={(e) => {
          console.log("Avatar clicked");

          e.preventDefault();
          e.stopPropagation();
          dispatch(setProfileDialog(!profileDialogState))
        }}
        >
          <AvatarImage alt="user avatar" className="rounded-full" src="/placeholder.svg?height=40&width=40" />
          <AvatarFallback className="rounded-full">{user.data?.email}</AvatarFallback>
        </Avatar>
      </div >
      <div className="absolute top-[55px] right-12">
        {profileDialogState && <ShowProfile user={user} />}
      </div>
    </>
  )
}
