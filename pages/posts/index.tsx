import { useState, useMemo } from "react"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { dehydrate, useQuery, QueryClient } from "react-query"
import Navbar from "../components/navbar"

async function fetchPosts() : Promise<[]>{
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await res.json()
    return data
}

export const getServerSideProps : GetServerSideProps = async ()=>{
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery("posts", fetchPosts)
    return {
        props : {
            dehydrationState : dehydrate(queryClient)
        }
    }
}

function Posts(){
    const [ title, setTitle ] = useState("")
    const { data : postData } = useQuery("posts", fetchPosts, {
        refetchOnMount : false,
        refetchOnWindowFocus : false
    })

    const filterData = useMemo(
        ()=>
            postData?.filter((post)=>
                post?.title.toLowerCase().includes(title.toLowerCase())
            ),
        [title, postData]
    )


    return(
        <>  
            <Navbar />
            <div className="container">
                <div className="mt-3">
                    <input type="text" 
                        placeholder="Username"
                        className="form-control"
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}

                    />
                </div>
            
                <table className="table table-sm mt-4">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">TITLE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData?.map((post: { id : number, title: string}, index : number)=>{
                            return(
                                <tr>
                                    <th scope="row">{ index + 1 }</th>
                                    <td>{post?.id}</td>
                                    <td>{post?.title}</td>
                                    <td>
                                        <div>
                                            <Link href={`/posts/${post.id}`} legacyBehavior>
                                                <a className="btn btn-light btn-sm">
                                                    view
                                                </a>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                </table>
            </div>
        </>
    )
}


export default Posts