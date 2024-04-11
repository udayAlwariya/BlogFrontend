import { Comment } from "../Comments";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config";

export function Postdetails({CommentsArray,setCommentsArray}){
    const[details,setDetails] = useState({})
    const [showComments,setShowComments] = useState(false)
    const[commentObj,setComment] = useState({
        comment : ""
    })
    const {id} = useParams()
    useEffect(()=>{
        axios({
            method : "get",
            url : `${config.url}/auth`,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then(()=>{
           setShowComments(true)
        })
        .catch(()=>{
            setShowComments(false)
           
        })
    },[])

    useEffect(()=>{
        axios({
            method : "get",
            url : `${config.url}/post/getPost/`+ id,
           
        })
        .then((res)=>{
            setDetails(res.data.post)            
        })
        .catch(()=>{
            console.log("error")
        })
    },[])

    function clickHandler(){
        if(commentObj.comment==""){
            alert("Enter something")
        } else{
            axios({
                method : "post",
                url : `${config.url}/post/comment/`+ id,
                headers : {
                    Authorization : localStorage.getItem("token")
                },
                data : commentObj
            }).then((res)=>{
                setCommentsArray(res.data.msg.Comments)
                setComment(prev=>({
                    ...prev,
                    comment : ""
                }))
            })
        }
        
    }
    useEffect(()=>{
        axios({
            method : "get",
            url : `${config.url}/post/getComments/`+ id,
        }).then((res)=>{
            setCommentsArray(res.data.post[0].Comments)
            
        })
    },[])
    

    function handler(e){
        const {name,value} = e.target
        setComment(prev=>({
            ...prev,
            [name] : value
        }))
    }
    return(
        <div className="w-8/12 mt-10 space-y-3 mx-auto mb-3">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">{details.title}</h1>
              
            </div>

            <div className="flex justify-between">
                <p className="text-gray-400">{details.username}</p>
                
            </div>
            <div>
                <img src={`${config.url}/images/${details.image}`} className="w-full mb-7" alt="" />
            </div>
            <p className="mb-10">
                {details.description}
            </p>
            <div className="flex items-center mb-1 font-semibold">
            <h1>Categories:</h1>

            <div className="ml-2">
                {details.category && details.category.map((value,index)=>{
                    return <h1 key={index} className="bg-gray-400 px-2 rounded-md py-1">{value}</h1>
                })}
            </div>
            
            </div>
            <h1 className="font-bold">Comments:</h1>
            {CommentsArray.map((comt)=>{
                return <Comment comt={comt} showDeleteBtn = {false} />
            })}
            {console.log(showComments)}
            {showComments?<div>
                <input type="text" value={commentObj.comment} name="comment" onChange={handler} className="w-10/12 py-3 mr-3 outline-none" placeholder="Write a comment" />
                <button onClick={clickHandler} className="bg-black text-white px-2 py-3">Add Comment</button>
            </div>:""}
        </div>
    )
}
