import { useEffect, useState } from "react";
import axios from "axios"
import Users from "../components/Users";
import { Link } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";

const HomePage = () =>{
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getUsers = async() =>{
        try {
            setIsLoading(true);
            const response = await axios.get(`${VITE_BACKEND_URL}/users`);
            console.log(response.data);
            setUsers(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }
    useEffect(() =>{ 
        getUsers();
    }, []);
    return(
        <div>
            
            <div>
                <Link to={'/create'} className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Create a User</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {isLoading ? (
                    "Loading"
                ) : (
                    <>
                    {users.length > 0 ? (
                        <>
                            {users.map((users, index) =>{
                        return (
                            <Users key={index} users={users} getUsers = {getUsers}/>
                        )
                    })}
                        </>
                    ) : (
                        <div>
                            <h3>There is no user!</h3>
                        </div>
                    )}
                    </>
                )}
            </div>
        </div>
    )
}
export default HomePage;