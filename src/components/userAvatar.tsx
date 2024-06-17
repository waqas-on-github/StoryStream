'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarByUserName } from "./avatarByUserName";


export type avatarByPicType = {
    profilePic: string | null, username: string
}


export const AvatarByPic = ({ profilePic, username }: avatarByPicType) => {


    return (
        <div className="">
            <Avatar>

                {profilePic && <AvatarImage
                    alt="user avatar"
                    className="object-cover border rounded-full  border-red-950 h-[30px] w-[50px"
                    src={profilePic} />}

                <AvatarFallback className=" bg-gray-300 h-[50px] w-[50px">
                    {username && <AvatarByUserName username={username} />}
                </AvatarFallback>
            </Avatar>
        </div>
    )
}

