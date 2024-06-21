"use client"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { getSingleUser } from "@/lib/server_utils";
import LogoutBtn from "./logoutBtn";
import ActiveLink from "./activeLink";

export function ShowUserDetails({ user }: { user: Awaited<ReturnType<typeof getSingleUser>>; }) {

  return (
    <Card className="w-[200px]">
      <CardHeader >
        {user.data?.profile?.username}
      </CardHeader>
      <CardContent className="flex flex-col items-center" >
        <ActiveLink href='/profile' > Profile</ActiveLink>
        <ActiveLink href='#' > Profile</ActiveLink>
        <ActiveLink href='#' > Profile</ActiveLink>
        <LogoutBtn />
      </CardContent>

    </Card>
  )
}
