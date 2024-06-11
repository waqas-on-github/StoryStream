import { Bookmark } from "@prisma/client"
import { prisma } from "../../prismaClient"
import RemoveBookmarkBtn from "./removeBookmarkBtn"

const ShowBookmarkedArticle = async ({ bookmark }: { bookmark: Bookmark }) => {

    const article = await prisma.articles.findUnique({
        where: { id: bookmark.articleId }
    })

    if (!article) {
        return <> NO ARTICLE FOUND ...</>
    }

    return (
        <div>

            <h1>{article.title}</h1>
            <RemoveBookmarkBtn bookmark={JSON.stringify(bookmark)} />

        </div>
    )
}

export default ShowBookmarkedArticle