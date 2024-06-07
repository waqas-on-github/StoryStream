'use client'
import React from 'react'
import Markdown from 'markdown-to-jsx'

interface Article {
    user: {
        email: string
    },
    text: string
}

interface RenderMdToHtmlProps {
    articles: string
}

const RenderMdToHtml = ({ articles }: { articles: string }) => {
    const parsedArticles: Article[] = JSON.parse(articles)

    const parsedArticlesWithText = parsedArticles.map((oneArticle: Article): { email: string, text: string } => {
        const text = JSON.parse(JSON.parse(oneArticle.text)) as string
        return {
            email: oneArticle?.user.email,
            text: text
        }
    })

    console.log(parsedArticlesWithText);

    return (
        <>
            {
                parsedArticlesWithText.map((oneArticle, index) => {
                    return (
                        <div key={index}>
                            <p>user: {oneArticle.email}</p>
                            <Markdown options={{
                                overrides: {
                                    h1: {
                                        component: "h1",
                                        props: {
                                            className: "text-2xl font-bold",
                                        },
                                    },
                                    p: {
                                        component: "p",
                                        props: {
                                            className: "italic",
                                        },
                                    },
                                    ol: {
                                        component: "ol",
                                        props: {
                                            className: "list-decimal ml-5", // added margin-left for better list indentation
                                        },
                                    },
                                    ul: {
                                        component: "ul",
                                        props: {
                                            className: "list-disc ml-5", // added margin-left for better list indentation
                                        },
                                    },
                                    li: {
                                        component: "li",
                                        props: {
                                            className: "font-bold",
                                        },
                                    },
                                },
                            }} >{oneArticle?.text}</Markdown>
                        </div>
                    )
                })
            }
        </>
    )
}

export default RenderMdToHtml
