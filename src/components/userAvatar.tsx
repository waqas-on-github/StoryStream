'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export const UserAvatar = () => {
    return (
        <div className="w-8 h-8">
            <Avatar  >
                <AvatarImage alt="user avatar" className="rounded-full" src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="rounded-full">{ }</AvatarFallback>
            </Avatar>
        </div>
    )
}
