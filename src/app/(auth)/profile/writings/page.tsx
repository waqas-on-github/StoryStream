import { CheckAuth } from "@/actions/checkAuth"
import { prisma } from "../../../../../prismaClient"
import ShowWritings from "@/components/showWritings"

const YourWritings = async () => {

    const { user } = await CheckAuth()

    let myWritings
    if (user && user.id) {
        myWritings = await prisma.articles.findMany({
            where: { userId: user?.id }
        })

    }


    if (!myWritings || myWritings.length === 0) {
        return <> not Articles found </>
    }



    return (
        <>{myWritings && <ShowWritings writings={myWritings} />}</>
    )
}

export default YourWritings
