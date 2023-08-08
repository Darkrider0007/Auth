"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import  axios  from 'axios';
import { toast,  Toaster } from 'react-hot-toast';


export default function SignupPage(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email: "",
        password: "",
        username: "",       
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);


    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            
            console.log("Signup success",response.data);
            toast.success("Signup success");
            setTimeout(() => {
                router.push("/login");
              }, 2000);
        }catch(error:any){
            console.log("Signup failed",error);
            if (error.response?.status === 400) {
                toast.error('Email already exists!',{
                    icon: '❌',
                    style: {
                      borderRadius: '10px',
                      background: '#333',
                      color: '#fff',
                    },
                  });
            }
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length>0 && user.password.length>0
             && user.username.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);

    return(
        <div className="flex flex-col items-center 
        justify-center min-h-screen py-2">
            <h1 className='text-center text-white
            text-2xl'>
                {loading ? "Loading..." : "Signup"}
            </h1>
            <hr/>
            <label htmlFor="username">username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg 
                mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                value = {user.username}
                onChange = {(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg 
                mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value = {user.email}
                onChange = {(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg 
                mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value = {user.password}
                onChange = {(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <button
            onClick={onSignup}
            className="p-2 border border-grey-300 
            rounded-lg mb-4 focus:outline-none 
            focus:border-gray-600 bg-red-500
             hover:bg-slate-400 ">{buttonDisabled ? "No Signup"
             :"Signup Here"}</button>
             <Link href="/login">Visit Login Page</Link>      
        </div>
    )
}