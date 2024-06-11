import { DeleteArticle } from "./deleteArticle"


const ShowWritings = ({ writings }) => {


    return (
        <>
            {writings?.map((oneArticle) => {
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