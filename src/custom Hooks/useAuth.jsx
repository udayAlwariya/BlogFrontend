import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config";


export function useAuth(path1,path2){
    const navigate = useNavigate()
    useEffect(()=>{
        axios({
            method : "get",
            url : `${config.url}/auth`,
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