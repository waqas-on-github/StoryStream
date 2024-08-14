import { CheckAuth } from "@/actions/checkAuth"
import RenderToMd from "./renderToMd"
import { updateViewCount } from "@/lib/server_utils"

const RenderSingleArticle = async ({ SingleArticle }: { SingleArticle: any }) => {

    if (!SingleArticle) {
        return <> Article Not Found ....</>
    }
    const { user } = await CheckAuth()
    console.log(user);

    // update the view count 
    await updateViewCount(SingleArticle.id, user.id)



    return (

        <div>
            <h1>{SingleArticle?.title}</h1>
            {SingleArticle && <RenderToMd oneArticle={JSON.parse(SingleArticle?.text)} />}


        </div>
    )
}

export default RenderSingleArticle