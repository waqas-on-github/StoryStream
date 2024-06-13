'use client'
import { z } from "zod"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addComment } from "@/actions/addComment"
import { usePostComment } from "@/hooks/usePostComment"
import { LoaderIcon } from "lucide-react"

// validation sechema 

const commentScehema = z.object({
    comment: z.string().trim().min(3).max(50)
})



const CommentForm = ({ slug }: { slug: string }) => {

    const { trigger, register, getValues, formState: { errors }, reset } = useForm<z.infer<typeof commentScehema>>({
        resolver: zodResolver(commentScehema)
    })
    const { mutate, isPending } = usePostComment()

    const submit = async () => {

        const isTriggerd = await trigger()

        if (!isTriggerd) {
            console.log("comment form is not triggerd ", isTriggerd);
            return
        }


        const values = getValues()


        mutate({ slug: slug, ...values })


        reset()


    }

    return (
        <form action={submit} className="flex gap-3" >
            <Label htmlFor="comment"></Label>
            <div className="flex flex-col text-[2px]">
                <Input placeholder="comment here" type="text" {...register('comment')} />
                {errors?.comment && <span className="text-sm text-red-400">{errors?.comment?.message}</span>}
            </div>
            {isPending ?
                <Button className="w-[50px] rounded-sm" disabled > <LoaderIcon /> </Button>

                :
                <Button className="w-[50px] rounded-sm" type="submit" > add </Button>
            }
        </form>
    )
}

export default CommentForm