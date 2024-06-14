import RenderToMd from "./renderToMd"

const RenderSingleArticle = ({ SingleArticle }: { SingleArticle: any }) => {

    if (!SingleArticle) {
        return <> Article Not Found ....</>
    }
    return (

        <div>
            <h1>{SingleArticle?.title}</h1>
            {SingleArticle && <RenderToMd oneArticle={JSON.parse(SingleArticle?.text)} />}

        </div>
    )
}

export default RenderSingleArticle