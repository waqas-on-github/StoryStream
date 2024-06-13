import { CheckAuth } from "@/actions/checkAuth"
import { UserAvatar } from "./userAvatar"
import CommentForm from "./commentForm"

const AddComment = async ({ slug }: { slug: string }) => {
    const { user } = await CheckAuth()
    return (
        <>
            <div className=" flex ">

                <UserAvatar />
                <CommentForm slug={slug} />
            </div>


        </>
    )
}

export default AddComment