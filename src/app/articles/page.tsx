import React from 'react'
import { prisma } from '../../../prismaClient'
import RenderMdToHtml from '@/components/renderMdToHtml'
import { CheckAuth } from '@/actions/checkAuth'



const page = async () => {


    const { user } = await CheckAuth()
    const articles = await prisma?.articles?.findMany(

        {
            include: {
                user: { select: { email: true } },
                votes: { select: { voteType: true } }
            }
        }

    )




    return (
        <>
            <RenderMdToHtml articles={JSON.stringify(articles)} user={user.id} /> 

        </>
    )
}

export default page


