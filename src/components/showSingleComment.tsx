'use client'
import { useDeleteComment } from "@/hooks/useDeleteComment"
import { EllipsisVertical } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import CommentForm from "./commentForm";
import { AvatarByPic } from "./userAvatar";
import { Profile } from "@prisma/client";

const ShowSingleComment = ({ comment, articleId, loggendInUserId, alreadyCommented, profile }: { loggendInUserId: string; comment: any; articleId: string, alreadyCommented: boolean; profile: Profile }) => {

    const { mutate, isPending } = useDeleteComment()


    const removeComment = async () => {
        mutate({ commentId: comment?.id, articleId: articleId })
    }

    return (
        <>
            <div className="flex  items-center">
                <div className="flex items-center justify-center">
                    {/* <UserAvatar /> */}
                    <AvatarByPic profilePic={profile.profilePic} username={profile.username} />
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