import React from 'react'
import RenderToMd from './renderToMd'
import { Card } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'
import CardBtnWrapper from './cardBtnWrapper'
import { prisma } from '../../prismaClient'



const RenderMdToHtml = async ({ user, searchParams }: { user: string; searchParams: { query: string, date: 'asc' | 'desc', page: string } }) => {




    const articles = await prisma?.articles?.findMany(
        {
            where: { title: { contains: searchParams?.query || "" } },
            orderBy: { createdAt: searchParams?.date || "asc" },
            include: {
                user: { select: { email: true } },
                votes: { select: { voteType: true } }
            },
            take: 6,
            skip: Number(searchParams.page) || 0

        }

    )


    console.log(articles);

    const parsedArticlesWithText = articles.map((oneArticle: any) => {

        const text = oneArticle.text
        return {
            userEmail: oneArticle.user.email,
            id: oneArticle.id,
            title: oneArticle?.title,
            email: oneArticle?.user?.email,
            text: JSON.parse(text),
            image: oneArticle.featureImage,
            ...oneArticle


        }
    })



    if (!articles || articles.length === 0) {
        return <> No Articles Found </>
    }



    return (
        <>
            {
                parsedArticlesWithText.map((oneArticle: any, index: any) => {
                    return (
                        <> 
                        <Card className='w-[300px] flex flex-col justify-center ' key={index}>
                            <h1> {oneArticle.title}</h1> <span className='text-[10px]'  >
                                by---{oneArticle.email}</span>
                            {oneArticle && oneArticle.image && <Image src={oneArticle?.image} alt="feature image" width={200} height={200} />}
                            <div className='flex flex-col  p-2'>
                                <RenderToMd oneArticle={oneArticle.text.slice(0, 50)} />
                                <Link className='self-end text-[12px]' href={`/articles/${oneArticle.id}`} > Read More </Link>
                            </div>
                            <CardBtnWrapper articleId={oneArticle.id} user={user} />

                        </Card  >
                        </>
                    )
                })
            }
        </>
    )
}

export default RenderMdToHtml
