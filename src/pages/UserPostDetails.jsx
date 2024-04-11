import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Comment } from "../Comments";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {toast} from "react-toastify"
import axios from "axios";
import { config } from "../config";

export function UserPostDetails(){
    const[details,setDetails] = useState({})
    const[CommentsArray,setCommentsArray] = useState([])
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(()=>{
        axios({
            method : "get",
            url : `${config.url}/post/getPost/`+ id,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then((res)=>{
            setDetails(res.data.post)
        })
        .catch(()=>{
            navigate("/register")
        })
    },[])

    useEffect(()=>{
        axios({
            method : "get",
            url : `${config.url}/post/getComments/`+ id,
        }).then((res)=>{
            setCommentsArray(res.data.post[0].Comments)
            console.log(res.data.post[0].Comments)
        })
    },[])

    function deleteHandler(){
        axios({
            method : "delete",
            url : `${config.url}/post/deletePost/${id}`
        })
        .then(()=>{
            toast.success('Blog Deleted!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
            navigate("/profile")
        })
        .catch(()=>{
            console.log("ERROR")
        })
    }
    function editHandler(){
        navigate(`/edit/${id}`)
    }
    return(
        <div className="w-8/12 mt-10 space-y-3 mx-auto mb-3">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">{details.title}</h1>
                <div className="flex space-x-2">
                    <p onClick={editHandler} className="cursor-pointer"><FaRegEdit/></p>
                    <p onClick={deleteHandler} className="cursor-pointer"><MdDelete/></p>
                </div>
            </div>

            <div className="flex justify-between">
                <p className="text-gray-400">{details.username}</p>
                <p className="text-gray-400">Sun Aug 06 2023  18:03:49</p>
            </div>
            <div>
                <img src={`${config.url}/images/${details.image}`} className="w-full mb-7" alt="" />
            </div>
            <p className="mb-10">
                {details.description}
            </p>
            <div className="flex items-center mb-1 font-semibold">
            <h1>Categories:</h1>
            <div className="ml-3 space-x-2 flex">
                {details.category && details.category.map((value,index)=>{
                    return <h1 key={index} className="bg-gray-400 px-2 rounded-md py-1">{value}</h1>
                })}
            </div>
            </div>
            <h1 className="font-bold">Comments:</h1>
            {CommentsArray.map((comt)=>{
                return <Comment comt={comt} showDeleteBtn={true} setCommentsArray={setCommentsArray} id={id}/>
            })}
        </div>
    )
}
