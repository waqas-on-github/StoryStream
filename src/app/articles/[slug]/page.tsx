import AddComment from "@/components/addComment";
import ShowComments from "@/components/showComments";
import { getSingleArticle } from "@/utils/dataFetcher";
import { CheckAuth } from "@/actions/checkAuth";
import RenderSingleArticle from "@/components/renderSingleArticle";

const SingleArticle = async ({ params: { slug } }: { params: { slug: string } }) => {

    const { user, profile } = await CheckAuth()

    const singleArticle = await getSingleArticle(slug)

    if (!singleArticle.success || singleArticle.error?.message) {
        return <> Failed to get Article </>
    }


    return (
        <>
            <RenderSingleArticle SingleArticle={singleArticle?.data} />
            <AddComment slug={slug} />
            {singleArticle?.data && profile?.data && < ShowComments userId={user.id} articleId={singleArticle.data?.id} profile={profile.data} />}


        </>
    )
}

export default SingleArticle    