"use client"
import { useState } from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"

export default function ProfilePage(){
    const router = useRouter()
    const [data, setData] = useState("")

    const logout =  async () => {
        try {
            await axios.get("/api/users/logout")
            router.push("/login")
            
        } catch (error: any) {
            console.log(error.message)
            
        }

    }

    const getUserDetails = async () => {
       const res = await axios.get('api/users/me')
       console.log(res.data);
       setData(res.data.data._id)
    }
    return (
        <div>
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2>{data === 'nothing'? "Nothing" : 
            <Link
            href={`/profile/${data}`}
            >
                {data}

            </Link>}
            </h2>
            <hr />
            <button 
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
            <button 
            onClick={getUserDetails}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                User Details 
            </button>
        </div>
    )
}