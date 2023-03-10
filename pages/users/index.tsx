import Navbar from "../components/navbar"
import { GetServerSideProps } from "next"
import { useState, useMemo } from "react"
import { useQuery, dehydrate, QueryClient } from "react-query"


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
    const [ username, setUsername ] = useState("")

    const { data : usersData } = useQuery("users", fetchUsers,{
        refetchOnMount : false,
        refetchOnWindowFocus : false
    })

    const filterData = useMemo(
        ()=>
            usersData?.filter((user)=>
                user?.username.toLowerCase().includes(username.toLowerCase())
            ),
        [username, usersData]
    )


    return(
        <>  
            <Navbar />
            <div className="container">
                <div className="mt-3">
                    <input type="text" 
                        placeholder="Username"
                        className="form-control"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}

                    />
                </div>

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
                        {filterData?.map((user : User, index : number)=>{
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