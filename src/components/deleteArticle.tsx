"use client"
import { LoaderIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useDeleteArticle } from "@/hooks/useDeleteArticle"

export const DeleteArticle = ({ id, userId }: { id: string, userId: string }) => {

    const { mutate, isPending } = useDeleteArticle()

    const deleteAtricle = async () => {

        mutate(({ id, userId }))
    }


    return (

        <>
            {isPending ?
                <Button className="w-[80px]" disabled={isPending} variant={"destructive"} > <LoaderIcon /> </Button> :
                <Button className="w-[80px]" variant={"destructive"} onClick={deleteAtricle} >DELETE </Button>
            }
        </>
    )
}
