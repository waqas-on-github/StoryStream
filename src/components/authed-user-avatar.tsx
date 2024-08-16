
"use client"
import { DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { getSingleUser } from "../lib/server_utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuSeparator } from "./ui/dropdown-menu"
import { AvatarByPic } from "./userAvatar"
import ActiveLink from "./activeLink"
import LogoutBtn from "./logoutBtn"
import { useState } from "react"
import { AvatarByUserName } from "./avatarByUserName"

export function AuthedUserAvatar({ user }: { user: Awaited<ReturnType<typeof getSingleUser>> }) {


  const [position, setPosition] = useState("top")


  return (
    <>
      <DropdownMenu>

        <DropdownMenuTrigger >





          {user.data?.profile?.username && !user.data.profile.profilePic ?

            <AvatarByUserName username={user.data?.profile?.username} /> :

            user.data?.profile?.profilePic && <AvatarByPic profilePic={user.data?.profile?.profilePic} />

          }







        </DropdownMenuTrigger>
        <DropdownMenuContent className=" flex items-center justify-center flex-col gap-4 " >
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ActiveLink href='/profile' > Profile</ActiveLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogoutBtn />
          </DropdownMenuItem>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}></DropdownMenuRadioGroup>
        </DropdownMenuContent>

      </DropdownMenu>
    </>
  )
}
