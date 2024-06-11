import React from 'react'
import { Button } from './ui/button'
import { LoaderIcon } from 'lucide-react'
import { useDownvote } from '@/hooks/useDownvote'

const UpVoteBtn = ({ articleId }: { articleId: string }) => {

    const { mutate, isPending } = useDownvote()

    const submit = async () => {

        mutate(articleId)
    }

    return (

        <>
            {isPending ? <Button> <LoaderIcon /> </Button> :
                <Button
                    onClick={submit}

                >Down vote</Button>
            }
        </>

    )
}

export default UpVoteBtn