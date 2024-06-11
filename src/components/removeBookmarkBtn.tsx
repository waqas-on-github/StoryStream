'use client'
import { Bookmark } from "@prisma/client"
import { Button } from "./ui/button"
import { useRemoveFromBookmarks } from "@/hooks/useRemoveFromBookmarks"
import { LoaderIcon } from "lucide-react"

const RemoveBookmarkBtn = ({ bookmark }: { bookmark: string }) => {

    const parsedBookmark: Bookmark = JSON.parse(bookmark)
    const { mutate, isPending } = useRemoveFromBookmarks()

    const submit = () => {
        mutate({
            articleId: parsedBookmark.articleId,
            bookmarkId: parsedBookmark.id
        })
    }

    return (

        <>
            {isPending ?
                <Button className="w-[100px] disabled:cursor-not-allowed " disabled={isPending}
                > <LoaderIcon /> </Button> :
                <Button className="w-[100px]" onClick={submit}
                > REMOVE </Button>

            }
        </>
    )
}

export default RemoveBookmarkBtn