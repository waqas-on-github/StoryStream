import RenderSingleArticle from "@/components/renderSingleArticle";
import { prisma } from "../../../../prismaClient"
import AddComment from "@/components/addComment";
import ShowComments from "@/components/showComments";

const SingleArticle = async ({ params: { slug } }: { params: { slug: string } }) => {

    const SingleArticle = await prisma.articles.findUnique({
        where: { id: slug }
    })



    return (
        <>
        <RenderSingleArticle SingleArticle={SingleArticle} />
            <AddComment slug={slug} />
            <ShowComments />
        </>
    )
}

export default SingleArticle    