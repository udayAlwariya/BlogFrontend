import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../custom Hooks/useAuth";
import {toast} from "react-toastify"
import { config } from "../config";

export function Signup(){
    const navigate = useNavigate()
    useAuth("/","/register")
    const [formData,setformData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : ""
    })

    function handler(e){
        const {name,value} = e.target
        setformData(prev=>({
            ...prev,
            [name] : value
        }))
    }

    function clickHandler(){
        axios({
            method : "post",
            url : `${config.url}/user/signup`,
            data : formData
        }).then((res)=>{
            localStorage.setItem("token","Bearer "+ res.data.token)
            toast.success('Signup Successfull!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
            navigate("/")
        })
        .catch(()=>{
            toast.error('Inputs Invalid', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                })
        })
    }

    return(
        <>
        
        <div className="mt-10 mx-auto shadow-md border-white-500 w-10/12 sm:w-7/12 md:w-5/12 lg:w-4/12 2xl:w-3/12 rounded-md">
            <div className="mt-5 text-center mb-6">
                <h1 className="font-bold text-3xl">Register</h1>
                <p className="text-gray-500 w-2/3 mx-auto mt-3">Enter your information to create an account</p>
            </div>

            <div className="mx-auto w-10/12">
            <div className="mb-2">
                <p className="font-bold mb-2">First Name</p>
                <input className="border rounded-md  w-full py-1 pl-2"  name="firstName" onChange={handler} type="text" placeholder="John"/>
            </div>
            <div className="mb-2">
                <p className="font-bold mb-2">Last Name</p>
                <input className="border rounded-md w-full py-1 pl-2"  name="lastName" onChange={handler}  type="text" placeholder="Doe"/>
            </div>
            <div className="mb-2">
                <p className="font-bold mb-2">Email</p>
                <input className="border rounded-md  w-full py-1 pl-2"  name="email" onChange={handler}  type="text" placeholder="JohnDoe@gmail.com"/>
            </div>
            <div className="mb-4">
                <p className="font-bold">Password</p>
                <input className="border rounded-md  w-full py-1 pl-2"  name="password" onChange={handler}  type="password" />
            </div>
            <div>
            <button onClick={clickHandler} className="border mb-3 text-white bg-black rounded-md  w-full py-1 pl-2">Signup</button>
            </div>
            
            </div>
        
        </div>
        </>
        
    )
}