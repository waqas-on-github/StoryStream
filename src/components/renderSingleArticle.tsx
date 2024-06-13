import RenderToMd from "./renderToMd"

const RenderSingleArticle = ({ SingleArticle }: { SingleArticle: any }) => {
    return (

        <div>
            <h1>{SingleArticle?.title}</h1>
            <RenderToMd oneArticle={JSON.parse(SingleArticle?.text)} />

        </div>
    )
}

export default RenderSingleArticle