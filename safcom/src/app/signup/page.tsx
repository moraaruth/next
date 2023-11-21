"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';


export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
     const response = await axios.post("api/users/signup", user)
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
     
    } finally {
      setLoading(false);
    }
  };

  useEffect (() => {
      if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
          setButtonDisabled(false)

      } else {
          setButtonDisabled(true)

      }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>{loading ? "Processing" : "Sign up"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <hr />
      <input
        className="p-2 border-gray-300 rounded-lg"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <hr />
      <label htmlFor="email">email</label>
      <hr />
      <input
        className="p-2 border-gray-300 rounded-lg"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <hr />
      <label htmlFor="password">password</label>
      <hr />
      <input
        className="p-2 border-gray-300 rounded-lg"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <hr />
      <button onClick={onSignup} className="p-2 border-gray-300 rounded-lg">
        {buttonDisabled ? "No sign up" : "Sign up"}
      </button>{" "}
      <hr />
      <Link href="/login">Visit sign up here</Link>
    </div>
  );
}
