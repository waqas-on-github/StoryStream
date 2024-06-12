'use client'
import { Button } from './ui/button'
import { LoaderIcon } from 'lucide-react'
import { useVote } from '@/hooks/useVote';

const UpVoteBtn = ({ articleId, voteType, totalUpVotes, isUpVotedByLoggedInUser }: { articleId: string; voteType: "UPVOTE" | "DOWNVOTE", totalUpVotes: any, isUpVotedByLoggedInUser: any }) => {





    const { mutate, isPending } = useVote()

    const submit = async () => {

        mutate({ articleId, voteType })
    }


    return (

        <>

            {isPending ? <Button> <LoaderIcon /> </Button> :
                <Button
                    className={`${isUpVotedByLoggedInUser ? "bg-blue-600" : ''}`}
                    onClick={submit}

                >upvote{totalUpVotes}</Button>
            }

        </>

    )
}




export default UpVoteBtn