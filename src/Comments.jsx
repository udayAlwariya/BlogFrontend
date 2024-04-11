import axios from "axios";
import { MdDelete } from "react-icons/md";
import { config } from "./config";
export function Comment({comt,id,setCommentsArray,showDeleteBtn}){
    const url = "https://blogbackend-0qmc.onrender.com"
    function clickHandler(cmtID){
        axios({
            method : "delete",
            url : `${config.url}/post/deleteComment/${id}/${cmtID}`
        })
        .then((res)=>{
            setCommentsArray(res.data.msg.Comments)
        })
    }
    return(
        <>
          <div className="bg-gray-200 mt-5 rounded-md">
                <div className="flex justify-between px-3 py-3">
                    <h1 className="font-semibold">@{comt.username}</h1>
                    <div className="flex space-x-3">
                    {showDeleteBtn?<p onClick={()=>clickHandler(comt._id)} className="text-sm"><MdDelete/></p>:""}
                    </div>
                </div>
                <p className="px-3">{comt.comment}</p>
            </div>
            
        </>
    )
}