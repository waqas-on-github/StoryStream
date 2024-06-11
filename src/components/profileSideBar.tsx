import Link from "next/link"

const ProfileSideBar = () => {
    return (
        <div className="flex flex-col p-5 gap-4 bg-gray-200 w-[10vw] h-[100vh]">

            <Link href="/profile/writings" > your writings   </Link>
            <Link href="/profile/bookmarks" > your bookmarks  </Link>
            <Link href="#" > Account Details   </Link>


        </div>
    )
}

export default ProfileSideBar