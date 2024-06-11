import { CheckAuth } from "@/actions/checkAuth"
import { prisma } from "../../../../../prismaClient"
import ShowBookmarks from "@/components/showBookmarks"

const YourWritings = async () => {

    const { user } = await CheckAuth()

    let myBookmarks
    if (user && user.id) {
        myBookmarks = await prisma.bookmark.findMany({
            where: { userId: user?.id }
        })

    }


    if (!myBookmarks || myBookmarks.length === 0) {
        return <> not Bookmarks  found </>
    }



    return (
        <>{myBookmarks && <ShowBookmarks bookmarks={myBookmarks} />}</>
    )
}

export default YourWritings
