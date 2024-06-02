"use server"

import { getSingleUser } from "@/lib/server_utils"
import { AuthedUserAvatar } from "./authed-user-avatar"

const AuthWrapper = async ({ userId }: { userId: string }) => {

    const user = await getSingleUser(userId)

    return (
        <AuthedUserAvatar user={user} />


    )
}

export default AuthWrapper