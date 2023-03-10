import { useQuery, useQueryClient, QueryClient, dehydrate } from "react-query"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import Navbar from "../components/navbar"

async function getPost(postid: number) : Promise<{}>{
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postid}`)
    const data = await res.json()
    return data
}

export const getServerSideProps : GetServerSideProps = async (context)=>{
    const { params } = context
    const { postid } = params
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(["post", postid], ()=>getPost(Number(postid)))

    return {
        props : {
            post : dehydrate(queryClient)
        }
    }
}

function PostDetail(){
    const router = useRouter()
    const { postid } = router.query
    const { data : post } = useQuery(["post", postid], ()=>getPost(Number(postid)),{
        refetchOnMount : false,
        refetchOnWindowFocus : false
    })
    const qc = useQueryClient()
    
    return(
        <>
            <Navbar />
            <div className="container mt-4">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>UserID</strong>:{post?.userId}</li>
                    <li className="list-group-item"><strong>PostID</strong>:{post?.id}</li>
                    <li className="list-group-item"><strong>Title</strong>: {post?.title}</li>
                    <li className="list-group-item"><strong>Body</strong>:{post?.body}</li>
                </ul>
            </div> 
        </>
    )
}


export default PostDetail