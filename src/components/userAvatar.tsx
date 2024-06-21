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

                {profilePic ? <AvatarImage
                    alt="user avatar"
                    className="w-[50px] h-[50px] rounded-full"
                    src={profilePic} />
                    :
                    <AvatarByUserName username={username} />

                }


            </Avatar>
        </div>
    )
}

