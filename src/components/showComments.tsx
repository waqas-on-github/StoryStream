import ShowSingleComment from "./showSingleComment"
import { getComments, hasAlreadyCommented } from "@/utils/dataFetcher"


const ShowComments = async ({ articleId, userId }: { articleId: string; userId: string }) => {

    const comments: Awaited<ReturnType<typeof getComments>> = await getComments()

    const commentLimit = await hasAlreadyCommented({ slug: articleId, userId })


    return (
        <>
            {comments.data?.map((comment) => {
                return (<>

                    <div key={comment.id} className="flex  flex-col gap-4" >
                        {comment.comment && <ShowSingleComment alreadyCommented={Boolean(commentLimit?.data?.length === 2)} articleId={articleId} comment={comment} loggendInUserId={userId} />}

                    </div>
                </>
                )
            })}
        </>
    )
}

export default ShowComments