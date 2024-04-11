import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth(path1,path2){
    const url = "https://blogbackend-0qmc.onrender.com"
    const navigate = useNavigate()
    useEffect(()=>{
        axios({
            method : "get",
            url : `${url}/auth`,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then(()=>{
            navigate(`${path1}`)
        })
        .catch(()=>{
            navigate(`${path2}`)
        })
    },[])
    
}       