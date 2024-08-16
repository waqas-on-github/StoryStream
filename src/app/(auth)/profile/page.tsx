import { CheckAuth } from "@/actions/checkAuth"
import ActiveLink from "@/components/activeLink"
import ShowProfile from "@/components/showProfile"
import { Button } from "@/components/ui/button"

const Profile = async () => {

    const { profile } = await CheckAuth()


    if (!profile || profile.error || !profile.data) {
        return <div> no Profile found
            <ActiveLink href='/profile/create' > <Button>Create One here </Button> </ActiveLink >  </div>
    }

    return (
        <>

            {profile && profile.data && profile.data.profilePic &&
                < ShowProfile profilePic={profile?.data.profilePic} profileId={profile.data.id} username={profile.data.username} />
            }
        </>
    )
}

export default Profile