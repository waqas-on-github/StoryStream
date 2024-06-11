import RenderSingleArticle from "@/components/renderSingleArticle";
import { prisma } from "../../../../prismaClient"

const SingleArticle = async ({ params: { slug } }: { params: { slug: string } }) => {

    const SingleArticle = await prisma.articles.findUnique({
        where: { id: slug }
    })



    return (
        <RenderSingleArticle SingleArticle={SingleArticle} />
    )
}

export default SingleArticle    