import { getTotalViews } from "@/utils/dataFetcher"

const TotalViews = async ({ articleId }: { articleId: string }) => {

    const totalViews: Awaited<ReturnType<typeof getTotalViews>> = await getTotalViews(articleId)


    return (

        <>
            {totalViews.data && <p>{totalViews.data}</p>}
        </>


    )
}

export default TotalViews