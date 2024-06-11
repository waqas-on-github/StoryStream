import { Bookmark } from "@prisma/client"
import ShowBookmarkedArticle from "./showBookmarkedArticle"

const ShowBookmarks = ({ bookmarks }: { bookmarks: Bookmark[] }) => {
    return (
        <div>{bookmarks.map((bookmark) => {
            return (
                <>
                    <ShowBookmarkedArticle bookmark={bookmark} />
                </>
            )
        })}</div>
    )
}

export default ShowBookmarks