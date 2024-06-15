'use client'
import { useDispatch, useSelector } from "react-redux";
import { UserAvatar } from "./userAvatar"
import { useDeleteComment } from "@/hooks/useDeleteComment"
import { RootState } from "../../store";
import { EllipsisVertical } from "lucide-react";
import { setEdit } from "@/featurs/commentSlice";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import CommentForm from "./commentForm";

const ShowSingleComment = ({ comment, articleId, loggendInUserId, alreadyCommented }: { loggendInUserId: string; comment: any; articleId: string, alreadyCommented: boolean }) => {

    const { mutate, isPending } = useDeleteComment()
    const edit = useSelector((state: RootState) => state.commentState.isEditOpen)
    const dispatch = useDispatch()


    const removeComment = async () => {
        mutate({ commentId: comment?.id, articleId: articleId })
    }

    return (
        <>
            <div className="flex  items-center">
                <div className="flex items-center justify-center">
                <UserAvatar />
                <p>{comment?.comment}</p>
            </div>

                <Dialog>
                    <DialogTrigger>
                        <EllipsisVertical size={15} />
                    </DialogTrigger>

                    <DialogContent>
                        <div className="mt-5">
                            <CommentForm commentText={comment?.comment} commentType="edit" alreadyCommented={alreadyCommented} slug={articleId} removeComment={removeComment} isPending={isPending} commentId={comment?.id} />

                        </div>
                    </DialogContent>
                </Dialog>



        </div >
        </>
    )
}

export default ShowSingleComment