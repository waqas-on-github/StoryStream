import Markdown from 'markdown-to-jsx'
import React from 'react'

const RenderToMd = (oneArticle: any) => {



    return (


        <Markdown options={{
            overrides: {
                h1: {
                    component: "h1",
                    props: {
                        className: "text-4xl font-bold my-2",
                    },
                },
                h2: {
                    component: "h2",
                    props: {
                        className: "text-3xl font-bold my-2",
                    },
                },
                h3: {
                    component: "h3",
                    props: {
                        className: "text-2xl font-bold my-2",
                    },
                },
                h4: {
                    component: "h4",
                    props: {
                        className: "text-xl font-bold my-2",
                    },
                },
                h5: {
                    component: "h5",
                    props: {
                        className: "text-lg font-bold my-2",
                    },
                },
                h6: {
                    component: "h6",
                    props: {
                        className: "text-base font-bold my-2",
                    },
                },
                p: {
                    component: "p",
                    props: {
                        className: "my-2",
                    },
                },
                ol: {
                    component: "ol",
                    props: {
                        className: "list-decimal ml-5 my-2",
                    },
                },
                ul: {
                    component: "ul",
                    props: {
                        className: "list-disc ml-5 my-2",
                    },
                },
                li: {
                    component: "li",
                    props: {
                        className: "my-1",
                    },
                },
                a: {
                    component: "a",
                    props: {
                        className: "text-blue-500 underline",
                    },
                },
                blockquote: {
                    component: "blockquote",
                    props: {
                        className: "border-l-4 border-gray-300 pl-4 italic my-2",
                    },
                },
                code: {
                    component: "code",
                    props: {
                        className: "bg-gray-200 rounded px-1",
                    },
                },
                pre: {
                    component: "pre",
                    props: {
                        className: "bg-gray-800 text-white p-2 rounded my-2",
                    },
                },
                table: {
                    component: "table",
                    props: {
                        className: "w-full border-collapse border border-gray-300 my-2",
                    },
                },
                thead: {
                    component: "thead",
                    props: {
                        className: "bg-gray-100",
                    },
                },
                tbody: {
                    component: "tbody",
                },
                tr: {
                    component: "tr",
                    props: {
                        className: "border border-gray-300",
                    },
                },
                th: {
                    component: "th",
                    props: {
                        className: "p-2 border border-gray-300 text-left",
                    },
                },
                td: {
                    component: "td",
                    props: {
                        className: "p-2 border border-gray-300",
                    },
                },
                img: {
                    component: "img",
                    props: {
                        className: "max-w-full h-auto my-2",
                    },
                },
            },
        }}>{oneArticle.oneArticle}</Markdown>
    )
}

export default RenderToMd