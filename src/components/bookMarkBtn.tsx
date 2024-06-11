'use client'
import { Bookmark, LoaderIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useAddToBookmark } from '@/hooks/useAddToBookmark'

const BookMarkBtn = ({ articleId }: { articleId: string }) => {

    const { mutate, isPending } = useAddToBookmark()

    const submit = () => {
        mutate(articleId)
    }



    return (
        <>
            {isPending ?
                <Button disabled={isPending} onClick={submit} > <LoaderIcon /> </Button > : <Button onClick={submit} > <Bookmark /></Button >
            }
        </>

    )
}

export default BookMarkBtn