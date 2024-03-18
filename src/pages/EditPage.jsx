import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const EditPage = () =>{
    let {id} = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        age: "",
        gender: "",
        image: "",
    })

    const getUser = async()=>{
        setLoading(true);
        try {
        const response = await axios.get(`${VITE_BACKEND_URL}/users/${id}`);
        setUser({
            name: response.data.name,
            age: response.data.age,
            gender: response.data.gender,
            image: response.data.image,
        })
        setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
            
        }
        
    }
    const updateUser = async(e) =>{
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`${VITE_BACKEND_URL}/users/${id}`, user);
            toast.success("Update user successfully !");
            navigate('/');
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    }
    useEffect(()=> {
        getUser();
    }, [])
    return(
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Update a User Form - {user.name}
            </h2>
            {isLoading ? ("Loading") :(
                <>
                <form onSubmit={updateUser}>
                <div className="space-y-2">
                    <div>
                        <label>Name</label>
                        <input type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} className="w-full block border p-3 text-gray-600 focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name" />
                    </div>
                    <div>
                        <label>Age</label>
                        <input type="number" value={user.age} onChange={(e) => setUser({...user, age: e.target.value})} min="1" max="50" className="w-full block border p-3 text-gray-600 focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Age" />
                    </div>
                    <div>
                        <label>Gender</label>
                        <input type="text" value={user.gender} onChange={(e) => setUser({...user, gender: e.target.value})} className="w-full block border p-3 text-gray-600 focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Gender" />
                    </div>
                    <div>
                        <label>Image URL</label>
                        <input type="text" value={user.image} onChange={(e) => setUser({...user, image: e.target.value})} className="w-full block border p-3 text-gray-600 focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Image URL" />
                    </div>
                    <div>
                        {!isLoading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Update</button>)}
                    </div>
                </div>
            </form>
                </>
            )}
        </div>
    )
}
export default EditPage;