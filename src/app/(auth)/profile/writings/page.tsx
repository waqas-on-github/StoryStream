import ShowWritings from "@/components/showWritings"
import { getWritings } from "@/utils/dataFetcher"

const YourWritings = async () => {

    const myWritings = await getWritings()

    if (!myWritings || myWritings.data?.length === 0 || myWritings.error) {
        return <> not Articles found </>
    }



    return (
        <>{myWritings && <ShowWritings articles={myWritings.data} />}</>
    )
}

export default YourWritings
