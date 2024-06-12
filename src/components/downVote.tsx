'use client'
import { Button } from './ui/button'
import { LoaderIcon } from 'lucide-react'
import { useVote } from '@/hooks/useVote'

const UpVoteBtn = ({ isDownVotedByLoggedInUser, totalDownVotes, articleId, voteType }: { totalDownVotes: any; articleId: string; voteType: "UPVOTE" | "DOWNVOTE", isDownVotedByLoggedInUser: any }) => {

    const { mutate, isPending } = useVote()

    const submit = async () => {
        mutate({ articleId, voteType })
    }

    return (

        <>
            {isPending ?
                <Button>
                    <LoaderIcon />
                </Button> :

                <Button
                    className={`${isDownVotedByLoggedInUser ? "bg-blue-600" : ''}`}
                    onClick={submit}>
                    Down vote {totalDownVotes}
                </Button>
            }
        </>

    )
}

export default UpVoteBtn