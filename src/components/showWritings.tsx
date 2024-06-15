import { Articles } from "@prisma/client"
import { DeleteArticle } from "./deleteArticle"




const ShowWritings = ({ articles }: { articles: Articles[] }) => {


    return (
        <>
            {articles?.map((oneArticle) => {
                return (
                    <>
                        <p>{oneArticle.title}</p>
                        <DeleteArticle id={oneArticle.id} userId={oneArticle.userId} />
                    </>
                )
            })}
        </>
    )
}

export default ShowWritings