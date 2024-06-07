import { Articles } from '@prisma/client'
import React from 'react'
import { prisma } from '../../../prismaClient'
import RenderMdToHtml from '@/components/renderMdToHtml'

const page = async () => {

    const articles: Articles[] = await prisma.articles.findMany({ include: { user: true } })





    return (
        <>
            <RenderMdToHtml articles={JSON.stringify(articles)} />
        </>
    )
}

export default page