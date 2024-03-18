
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";
const CreatePage = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const saveUser = async(e) => {
        e.preventDefault();
        if (name === "" || age === "" || gender === "" || image === "") {
            alert("Please fill out all forms !");
            return;
        } try {
            setIsLoading(true);
            const response = await axios.post(`${VITE_BACKEND_URL}/product`, {name: name, age: age, gender: gender, image: image});
            toast.success(`Submitted ${response.data.name} successfully !`)
            setIsLoading(false);
            navigate('/');
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }
    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Create a User Form
            </h2>
            <form onSubmit={saveUser}>
                <div className="space-y-2">
                    <div>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full block border p-3 text-gray-600 focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name" />
                    </div>
                    <div>
                        <label>Age</label>
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} min="1" max="50" className="w-full block border p-3 text-gray-600 focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Age" />
                    </div>
                    <div>
                        <label>Gender</label>
                        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="w-full block border p-3 text-gray-600 focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Gender" />
                    </div>
                    <div>
                        <label>Image URL</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full block border p-3 text-gray-600 focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Image URL" />
                    </div>
                    <div>
                        {!isLoading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Save</button>)}
                    </div>
                </div>
            </form>
        </div>
    )
}
export default CreatePage;