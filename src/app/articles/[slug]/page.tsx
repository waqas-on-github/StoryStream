import RenderSingleArticle from "@/components/renderSingleArticle";
import AddComment from "@/components/addComment";
import ShowComments from "@/components/showComments";
import { getSingleArticle } from "@/utils/dataFetcher";
import { CheckAuth } from "@/actions/checkAuth";

const SingleArticle = async ({ params: { slug } }: { params: { slug: string } }) => {

    const { user } = await CheckAuth()

    const singleArticle = await getSingleArticle(slug)

    if (!singleArticle.success || singleArticle.error) {
        return <> Failed to get Article </>
    }


    return (
        <>
            <RenderSingleArticle SingleArticle={singleArticle?.data} />
            <AddComment slug={slug} />
            {singleArticle?.data && <ShowComments userId={user.id} articleId={singleArticle.data?.id} />}
        </>
    )
}

export default SingleArticle    