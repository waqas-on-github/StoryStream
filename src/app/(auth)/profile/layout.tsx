import ProfileSideBar from '@/components/profileSideBar'
import React from 'react'

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex ' >


            <div  >
                <ProfileSideBar />
            </div>

            <div className='' >
                {children}
            </div>

        </div>
    )
}

export default ProfileLayout