import { GetServerSideProps } from "next"
import { useQuery } from "react-query"
import Navbar from "../components/navbar"

async function fetchPosts() : Promise<[]>{
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await res.json()
    return data
}

export const getServerSideProps : GetServerSideProps = async ()=>{
    return {
        props : {
            posts : await fetchPosts()
        }
    }
}

function Posts({ posts } : { posts : []}){
    const { error, isLoading, data : postData } = useQuery("posts", fetchPosts, {
        initialData : posts,
        refetchOnMount : false,
        refetchOnWindowFocus : false
    })
    return(
        <>
            <Navbar />
            
            <div className="container">
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
                        {postData?.map((user: { id : number, title: string}, index : number)=>{
                            return(
                                <tr>
                                    <th scope="row">{ index + 1 }</th>
                                    <td>{user?.id}</td>
                                    <td>{user?.title}</td>
                                    <td>action</td>
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