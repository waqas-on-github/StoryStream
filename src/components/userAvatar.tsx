'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarByUserName } from "./avatarByUserName";


export type avatarByPicType = {
    profilePic: string | null, username: string
}


export const AvatarByPic = ({ profilePic, username }: avatarByPicType) => {

    console.log(profilePic);

    return (


        <div className="">


            <Avatar>

                {profilePic ? <AvatarImage
                    alt="user avatar"
                    className="w-[40px] h-[40px] rounded-full"
                    src={profilePic || '../../public/placeholder.svg'} />
                    :
                    <AvatarByUserName username={username} />

                }


            </Avatar>
        </div>
    )
}

