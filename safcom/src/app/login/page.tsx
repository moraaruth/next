
"use client";
import Link from "next/link";
import React from 'react';
import { useRouter } from "next/navigation";
import { axios } from "axios";




export default function LoginPage(){ 
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        
    })

    const onLogin = async () => {

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>Login</h1>
            <hr />
         <hr/>
             <label htmlFor="email">email</label><hr/>
            <input 
               className="p-2 border-gray-300 rounded-lg"
               id="email"
               type="text"
               value= {user.email}
               onChange={(e) => setUser({...user, email: e.target.value})}
               placeholder="email"
            
            /><hr/>
             <label htmlFor="password">password</label><hr/>
            <input 
               className="p-2 border-gray-300 rounded-lg"
               id="password"
               type="password"
               value= {user.password}
               onChange={(e) => setUser({...user, password: e.target.value})}
               placeholder="password"
            
            /><hr />
            <button onClick={onLogin}
            className="p-2 border-gray-300 rounded-lg" >Login</button> <hr />
            <Link href="/login">Visit login here</Link>
        </div>
    )
}