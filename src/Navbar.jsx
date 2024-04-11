import { BsSearch } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link,useNavigate,useLocation } from "react-router-dom";
import { isUserLoggedAtom, postAtom } from "./atom";
import {useRecoilState,useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import { SlClose } from "react-icons/sl";

export function NavBar(){
    const navigate = useNavigate()
    const location = useLocation()
    const [user,setUser] = useRecoilState(isUserLoggedAtom)
    const [search,setSearch] = useState("")
    const setPosts = useSetRecoilState(postAtom)
    const [toggle,setToggle] = useState(false)
    const url = "https://blogbackend-0qmc.onrender.com"


    function logoutHandler(){
        setToggle(false)
        localStorage.removeItem("token")
        setUser(false)
        navigate("/register")
    }
    useEffect(()=>{
            axios({
                method : "get",
                url : `${url}/auth`,
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            })
            .then(()=>{
                setUser(true)
            })
            .catch(()=>{
                setUser(false)
            })
    },[location.pathname])

    useEffect(()=>{
        axios.get(`${url}/post/searchPost?filter=`+search)
        .then((res)=>{
            setPosts(res.data.filteredPosts)
        })
    },[search])
    return(
        <div className="relative">
                {toggle && <div className="w-9/12 md:hidden block p-2 left-[12vw] mt-2 border-black border-2 bg-gray-100 absolute">
                <h1 onClick={()=>setToggle(false)}><SlClose className="text-2xl cursor-pointer mb-3" /></h1>
                {!user && <Link onClick={()=>setToggle(false)} to="/register"><h1 className="font-semibold">Register</h1></Link>}
                {!user && <Link onClick={()=>setToggle(false)} to="/signin"><h1 className="font-semibold">Log in</h1></Link>}
                {user && <Link onClick={()=>setToggle(false)} to="/create"><h1 className="font-semibold">Write</h1></Link>}
                {user && <Link onClick={()=>setToggle(false)} to="/profile"><h1 className="font-semibold">Profile</h1></Link>}   
                {user && <h1 className="cursor-pointer font-semibold" onClick={logoutHandler}>Logout</h1>}
            </div>}
         <div className="w-9/12 cursor-pointer items-center  mx-auto mt-5 flex  justify-between">
            <h1 onClick={()=>{
                navigate("/")
            }} className="font-bold sm:text-xl">Blog Market</h1>
            
             {(location.pathname=='/')?<div className=" hidden md:flex space-x-2 outline-none items-center">
              <BsSearch/> 
           <input type="text" onChange={(e)=>setSearch(e.target.value)} className="outline-none" placeholder="Search a post" />
            </div>:""}
            <div>
                <div className="hidden md:flex items-center space-x-2">
                {!user && <Link to="/register"><h1>Register</h1></Link>}
                {!user && <Link to="/signin"><h1>Log in</h1></Link>}
                {user && <Link to="/create"><h1>Write</h1></Link>}
                {user && <Link to="/profile"><h1>Profile</h1></Link>}   
                {user && <h1 className="cursor-pointer" onClick={logoutHandler}>Logout</h1>}
                </div>
                
                <RxHamburgerMenu onClick={()=>setToggle(true)} className="block md:hidden" />
            </div>
        </div>
            
        {location.pathname=='/'?<div className="md:hidden w-9/12 flex mx-auto mt-4 space-x-2 outline-none items-center">
        <BsSearch/> 
     <input type="text" onChange={(e)=>setSearch(e.target.value)} className="outline-none" placeholder="Search a post" />
      </div>:""}
        </div>
       
    )
}