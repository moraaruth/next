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


// import React, { FormEvent, useState } from "react";
// import { useMutation, useQuery } from "@apollo/client";
// import { GET_NOVELS } from "../../../graphhql/queries";
// import { ADD_NOVEL } from "../../../graphhql/mutations";
// import { INovel } from "../../../typings";
// import { Novel } from "../../../components/Novel";
// import { useRouter } from "next/navigation"
// import axios from "axios"





// const ProfilePage = () => {
// 	const router = useRouter()
// 	const [title, setTitle] = useState("");
// 	const [image, setImage] = useState("");
// 	const { data, loading, error } = useQuery(GET_NOVELS);
// 	const [addNovel] = useMutation(ADD_NOVEL, {
// 		variables: { image, title },
// 		refetchQueries: [{ query: GET_NOVELS }],
// 	});

// 	const novels: INovel[] = data?.novels;

// 	const logout = async () => {
// 		try {
// 			await axios.get("/api/users/logout")
// 			router.push("/login")

// 		} catch (error: any) {
// 			console.log(error.message)

// 		}

// 	}


// 	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		if (image === "" || title === "") return alert("Enter fields");

// 		addNovel({ variables: { image, title } });
// 		setTitle("");
// 		setImage("");
// 	};

// 	if (loading)
// 		return (
// 			<p className="text-white flex items-center justify-center">
// 				Loading ....
// 			</p>
// 		);
// 	// if (error)
// 	// 	return (
// 	// 		<p className="text-white flex items-center justify-center">
// 	// 			Oops! Something went wrong ....
// 	// 		</p>
// 	// 	);

// 	return (


// 		<div className="mt-5">
// 			<form onSubmit={handleSubmit} className="flex my-5 space-x-3">
// 				<input
// 					value={title}
// 					onChange={(e) => setTitle(e.target.value)}
// 					type="text"
// 					placeholder="Enter title"
// 					className="bg-transparent border text-white p-2 rounded-lg"
// 				/>
// 				<input
// 					value={image}
// 					onChange={(e) => setImage(e.target.value)}
// 					type="text"
// 					placeholder="Enter Image url"
// 					className="bg-transparent border text-white p-2 rounded-lg"
// 				/>
// 				<button className="bg-yellow-500 p-2 rounded-lg ">
// 					Add Novel
// 				</button>
// 			</form>
// 			<div className="grid grid-cols-4 gap-2">
// 				{novels && novels.map((novel) => (
// 					<Novel key={novel.id} novel={novel} />
// 				))}
// 			</div>
// 			<button 
//             onClick={logout}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//                 Logout
//             </button>
// 		</div>
// 	);
// };
// export default ProfilePage;