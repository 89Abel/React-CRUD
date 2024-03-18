import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../App";
const Users = ({ users, getUsers }) =>{
    const deleteUser = async(id) =>{
        const result= await Swal.fire({
            title: 'Are You Sure ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm'
        })
        if(result.isConfirmed){
            try {
                axios.delete(`${VITE_BACKEND_URL}/users/${id}`);
                toast.success('User Deleted Successfully !');
                getUsers();
            } catch (error) {
                toast.error(error.message);
            }
        }
        
    }
    return (
        <div className="bg-white rounded shadow-lg overflow-hidden">
            <img src={users.image} alt="" className="w-full h-28 object-cover"/>
            <div className="px-4 pt-2 pb-4">
                <h2 className="text font-semibold">{users.name}</h2>
                <div className="text-sm">Age: {users.age}</div>
                <div className="text-sm">Gender: {users.gender}</div>
                <div className="mt-2 flex gap-4">   
                <Link to={`/edit/${users._id}`} className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer">Edit</Link>
                <button onClick={() => deleteUser(users._id)} className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer">Delete</button>
                </div>
            </div>
        </div>
    )
}
export default Users;