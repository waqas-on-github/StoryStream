'use client'
import { Trash2, Edit, LoaderIcon } from "lucide-react"
import { AvatarByPic, avatarByPicType } from "./userAvatar"
import { useDeleteProfile } from "@/hooks/useDeleteProfile"
import AddProfile from "./addProfileForm"
import { AvatarByUserName } from "./avatarByUserName"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { setEditDialogState } from "@/featurs/profileSlice"
import '../app/icon.css'

const ShowProfile = ({ profilePic, username, profileId }: avatarByPicType & { profileId: string }) => {



    const { mutate, isPending } = useDeleteProfile()

    const dispatch = useDispatch()
    const isEditDialogOpen = useSelector((state: RootState) => state.profileState.isEditDialogOpen)


    return (
        < >

            <div className="flex items-center justify-center gap-10" >


                {profilePic ?

                    < AvatarByPic username={username} profilePic={profilePic} /> :
                    <AvatarByUserName username={username} />
                }



                <p>{username}</p>

                {
                    isPending ? <LoaderIcon /> :
                        <Trash2 type="button" onClick={async () => {
                            mutate(profileId)

                        }} />
                }

                <Edit onClick={() => dispatch(setEditDialogState(!isEditDialogOpen))} />

            </div>


            {isEditDialogOpen && <AddProfile profileId={profileId} username={username} profilePic={profilePic} />}


        </>
    )
}

export default ShowProfile