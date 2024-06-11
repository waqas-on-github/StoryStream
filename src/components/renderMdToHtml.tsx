'use client'
import React from 'react'
import RenderToMd from './renderToMd'
import { Card } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'
import BookMarkBtn from './bookMarkBtn'
import UpVoteBtn from './upVoteBtn'
import DownVote from './downVote'



const RenderMdToHtml = ({ articles }: { articles: string }) => {

    const parsedArticles: any = JSON.parse(articles)

    const parsedArticlesWithText = parsedArticles.map((oneArticle: any) => {

        const text = oneArticle.text
        return {
            userEmail: oneArticle.user.email,
            id: oneArticle.id,
            title: oneArticle?.title,
            email: oneArticle?.user?.email,
            text: JSON.parse(text),
            image: oneArticle.featureImage

        }
    })

    if (!parsedArticles || parsedArticles.length === 0) {
        return <> No Articles Found </>
    }



    return (
        <>
            {
                parsedArticlesWithText.map((oneArticle: any, index: any) => {
                    return (

                        <Card className='w-[300px] flex flex-col justify-center ' key={index}>
                            <h1> {oneArticle.title}</h1> <span className='text-[10px]'  >
                                by---{oneArticle.email}</span>
                            {oneArticle && oneArticle.image && <Image src={oneArticle?.image} alt="feature image" width={200} height={200} />}
                            <div className='flex flex-col  p-2'>
                                <RenderToMd oneArticle={oneArticle.text.slice(0, 50)} />
                                <Link className='self-end text-[12px]' href={`/articles/${oneArticle.id}`} > Read More </Link>
                            </div>
                            <div className='flex '>
                            <BookMarkBtn articleId={oneArticle.id} />
                                <UpVoteBtn articleId={oneArticle?.id} />
                                <DownVote articleId={oneArticle?.id} />
                            </div>

                        </Card  >
                    )
                })
            } 
        </>
    )
}

export default RenderMdToHtml
