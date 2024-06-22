import { CheckAuth } from "@/actions/checkAuth"
import CommentForm from "./commentForm"
import { hasAlreadyCommented } from "@/utils/dataFetcher"

const AddComment = async ({ slug }: { slug: string }) => {
    const { user } = await CheckAuth()

    const commentLimit = await hasAlreadyCommented({ slug, userId: user?.id })



    return (
        <>
            <div className=" flex ">

                <CommentForm commentText="" commentId="" commentType="add" alreadyCommented={Boolean(commentLimit?.data?.length === 2)} slug={slug} />
            </div>


        </>
    )
}

export default AddComment