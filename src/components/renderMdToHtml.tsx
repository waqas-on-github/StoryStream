'use server'
import RenderToMd from './renderToMd'
import { Card } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'
import CardBtnWrapper from './cardBtnWrapper'
import { getArticles } from '@/utils/dataFetcher'
import { CheckAuth } from '@/actions/checkAuth'



const RenderMdToHtml = async ({ searchParams }: { searchParams: { query: string, date: 'asc' | 'desc', page: string } }) => {

    const { user } = await CheckAuth()
    const articles = await getArticles({ searchParams })



    const parsedArticlesWithText = articles?.data?.map((oneArticle: any) => {

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



    if (!articles || articles?.data?.length === 0 || articles.error) {
        return <> No Articles Found </>
    }



    return (
        <>
            {
                parsedArticlesWithText && parsedArticlesWithText.map((oneArticle: any, index: any) => {
                    return (
                        <> 
                            <Card className='w-[300px] flex flex-col justify-center bg-gray-200 overflow-hidden ' key={index}>
                            <h1> {oneArticle.title}</h1> <span className='text-[10px]'  >
                                by---{oneArticle.email}</span>
                            {oneArticle && oneArticle.image && <Image src={oneArticle?.image} alt="feature image" width={200} height={200} />}
                            <div className='flex flex-col  p-2'>
                                <RenderToMd oneArticle={oneArticle.text.slice(0, 50)} />
                                <Link className='self-end text-[12px]' href={`/articles/${oneArticle.id}`} > Read More </Link>
                                </div>

                                <CardBtnWrapper articleId={oneArticle.id} user={user.id} />
                        </Card  >
                        </>
                    )
                })
            }
        </>
    )
}

export default RenderMdToHtml
