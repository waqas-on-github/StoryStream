"use client"
import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { getSingleUser } from "@/lib/server_utils";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setProfileDialog } from "@/featurs/navbar/navbarSlice";
import LogoutBtn from "./logoutBtn";

export function ShowProfile({ user }: { user: Awaited<ReturnType<typeof getSingleUser>>; }) {
  const dispatch = useDispatch()

  return (
    <Card className="w-[200px]">
      <CardHeader >
        {user.data?.email}
      </CardHeader>
      <CardContent className="flex items-center justify-center flex-col gap-4" >
        <Link href='#' > Profile</Link>
        <Link href='#' > Profile</Link>
        <Link href='#' > Profile</Link>
        <LogoutBtn />
      </CardContent>
      <CardFooter onMouseOut={() => dispatch(setProfileDialog(false))} className="flex justify-between">

      </CardFooter>
    </Card>
  )
}
