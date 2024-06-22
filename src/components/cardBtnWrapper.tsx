'use server'
import BookMarkBtn from "./bookMarkBtn"
import UpVoteBtn from "./upVoteBtn"
import DownVote from './downVote'
import { prisma } from "../../prismaClient"


const CardBtnWrapper = async ({ articleId, user }: { articleId: string; user: string }) => {


    const totalUpvotesCount = await prisma.vote.count({
        where: {
            articleId: articleId,
            voteType: "UPVOTE"
        }
    })


    const totalUDownVotesCount = await prisma.vote.count({
        where: {
            articleId: articleId,
            voteType: "DOWNVOTE"
        }
    })


    const isUpVotedByLoggedInUser = await prisma.vote.findFirst({
        where: { userId: user, voteType: "UPVOTE", articleId: articleId }
    })

    const isDownVotedByLoggedInUser = await prisma.vote.findFirst({
        where: { userId: user, voteType: "DOWNVOTE", articleId: articleId }
    })


    const isBookMarkedByLoggedUser = await prisma.bookmark.findFirst({
        where: { userId: user, articleId: articleId }
    })

    return (
        <div className='flex  '>
            <BookMarkBtn articleId={articleId} isBookMarkedByLoggedUser={isBookMarkedByLoggedUser} />
            <UpVoteBtn articleId={articleId} voteType="UPVOTE" totalUpVotes={totalUpvotesCount} isUpVotedByLoggedInUser={isUpVotedByLoggedInUser} />
            <DownVote articleId={articleId} voteType="DOWNVOTE" totalDownVotes={totalUDownVotesCount} isDownVotedByLoggedInUser={isDownVotedByLoggedInUser} />
        </div>
    )
}

export default CardBtnWrapper