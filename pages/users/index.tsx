import Navbar from "../components/navbar"
import { GetServerSideProps } from "next"
import { useQuery, dehydrate, QueryClient } from "react-query"


interface User{
    id : number, 
    username : string, 
    phone: string, 
    website : string
}

async function fetchUsers() : Promise<[]>{
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await res.json()
    return data
}


export const getServerSideProps: GetServerSideProps  = async ()=>{
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery("users", fetchUsers)
    return{
        props : {
            dehydrateState : dehydrate(queryClient)
        }
    }
}

function Users(){
    const { data : usersData } = useQuery("users", fetchUsers,{
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
                            <th scope="col">USERNAME</th>
                            <th scope="col">PHONE</th>
                            <th scope="col">WEBSITE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData?.map((user : User, index : number)=>{
                            return(
                                <tr>
                                    <th scope="row">{ index + 1 }</th>
                                    <td>{user?.id}</td>
                                    <td>{user?.username}</td>
                                    <td>{user?.phone}</td>
                                    <td>{user?.website}</td>
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

export default Users