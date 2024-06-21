
"use client"
import { DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { getSingleUser } from "../lib/server_utils"
import { ShowUserDetails } from "./show_user"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuSeparator } from "./ui/dropdown-menu"
import { AvatarByPic } from "./userAvatar"
import ActiveLink from "./activeLink"
import LogoutBtn from "./logoutBtn"
import { useState } from "react"

export function AuthedUserAvatar({ user }: { user: Awaited<ReturnType<typeof getSingleUser>> }) {


  const [position, setPosition] = useState("top")



  return (
    <>
      <DropdownMenu>

        <DropdownMenuTrigger >
          {
            user.data?.profile?.username &&
            < AvatarByPic username={user.data?.profile?.username} profilePic={user.data?.profile?.profilePic} />}
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" flex items-center justify-center flex-col gap-4 " >
          <DropdownMenuSeparator />
          {/* {<ShowUserDetails user={user} />} */}

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
