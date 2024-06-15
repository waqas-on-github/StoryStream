import { CheckAuth } from "@/actions/checkAuth"
import { prisma } from "../../../../../prismaClient"
import ShowBookmarks from "@/components/showBookmarks"
import { getBookmarks } from "@/utils/dataFetcher"

const YourWritings = async () => {

    const myBookmarks = await getBookmarks()


    if (myBookmarks.error || !myBookmarks.success || myBookmarks.data?.length === 0) {
        return <> not Bookmarks  found </>
    }


    return (
        <>{myBookmarks.data && <ShowBookmarks bookmarks={myBookmarks?.data} />}</>
    )
}

export default YourWritings
