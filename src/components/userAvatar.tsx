'use client'

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";


export type avatarByPicType = {
    profilePic: string,
}


export const AvatarByPic = ({ profilePic }: avatarByPicType) => {


    return (

            <Avatar>
            <AvatarImage
                    alt="user avatar"
                className="w-[40px] h-[40px] rounded-full border-[2px] border-red-600"
                src={profilePic} />

        </Avatar>
    )
}

