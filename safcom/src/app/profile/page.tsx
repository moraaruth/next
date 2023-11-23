"use client"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"

export default function ProfilePage(){
    const router = useRouter()

    const logout =  async () => {
        try {
            await axios.get("/api/users/logout")
            router.push("/login")
            
        } catch (error: any) {
            console.log(error.message)
            
        }

    }
    return (
        <div>
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <hr />
            <button 
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>
    )
}