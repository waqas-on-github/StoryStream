import ActiveLink from "./activeLink"

const ProfileSideBar = () => {
    return (
        <div className="flex flex-col p-5 gap-4 bg-gray-300 w-[10vw] h-[100vh]">

            <ActiveLink href="/profile" > Account Details   </ActiveLink>
            <ActiveLink href="/profile/writings" > your writings   </ActiveLink>
            <ActiveLink href="/profile/bookmarks" > your bookmarks  </ActiveLink>


        </div>
    )
}

export default ProfileSideBar