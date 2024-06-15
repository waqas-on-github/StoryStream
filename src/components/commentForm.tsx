'use client'
import { z } from "zod"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePostComment } from "@/hooks/usePostComment"
import { LoaderIcon } from "lucide-react"


const commentScehema = z.object({
    comment: z.string().trim().min(3).max(50)
})


type commentFormType = {
    slug: string;
    alreadyCommented: boolean;
    commentType: "add" | "edit";
    commentText: string,
    removeComment?: () => Promise<void>,
    isPending?: boolean,
    commentId: string

}


const CommentForm = ({ slug, alreadyCommented, commentType, commentText, removeComment, isPending: deleteIsPending, commentId }: commentFormType) => {

    const { trigger, register, getValues, formState: { errors }, reset } = useForm<z.infer<typeof commentScehema>>({
        resolver: zodResolver(commentScehema),
        defaultValues: { comment: commentText }
    })



    const { mutate, isPending } = usePostComment()

    const submit = async () => {

        const isTriggerd = await trigger()
        if (!isTriggerd) {
            console.log("comment form is not triggerd ", isTriggerd);
            return
        }

        const values = getValues()

        if (commentType === 'add') {
            mutate({ slug: slug, comment: values.comment, commentType: 'add' })
            reset()
        }

        if (commentType === 'edit') {
            mutate({ slug: slug, comment: values.comment, commentType: 'edit', commentId: commentId })
            reset()
        }




    }

    return (
        <form action={submit} className="flex gap-3" >
            <Label htmlFor="comment"></Label>
            <div className="flex flex-col text-[2px]">
                <Input placeholder={`${alreadyCommented ? " reached comment your target" : "add comment here"}`} type="text" {...register('comment')} />
                {errors?.comment && <span className="text-sm text-red-400">{errors?.comment?.message}</span>}
            </div>
            {isPending ?
                <Button className="w-[50px] rounded-sm" disabled > <LoaderIcon /> </Button>

                :
                <Button disabled={commentType === 'add' && alreadyCommented} className="w-[50px] rounded-sm" type="submit" > {commentType === "add" ? "add" : "update"} </Button>
            }


            {commentType === 'edit' && removeComment &&
                <>
                    {!deleteIsPending ?
                    <Button onClick={() => removeComment()} type="button"> delete</Button>
                    : <Button disabled type="button"><LoaderIcon /></Button>
                }
                </>

            }
        </form>
    )
}

export default CommentForm