import React from 'react'
import { Button } from './ui/button'
import { useUpvote } from '@/hooks/useUpvote'
import { LoaderIcon } from 'lucide-react'

const UpVoteBtn = ({ articleId }: { articleId: string }) => {

    const { mutate, isPending } = useUpvote()

    const submit = async () => {

        mutate(articleId)
    }

    return (

        <>
            {isPending ? <Button> <LoaderIcon /> </Button> :
                <Button
                    onClick={submit}

                >upvote</Button>
            }
        </>

    )
}

export default UpVoteBtn