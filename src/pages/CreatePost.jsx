import axios from "axios";
import { useState,useEffect } from "react"
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../custom Hooks/useAuth";
import {toast} from "react-toastify"

export function CreatePost(){
    useAuth("/create","/register")
    const[cat,setCat] = useState("")
    const[cats,setCats] = useState([])
    const[img,setImage] = useState("")
    const navigate = useNavigate()
    const url = "https://blogbackend-0qmc.onrender.com"
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            category: cats
        }));
    }, [cats]);

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            image: img
        }));
    }, [img]);
    
    
    function clickHandler(){
        setCats(prev=>[...prev,cat])
        setCat("")
    }

    function removeHandler(id){
        let newArray = cats.filter((val,idx)=>{
            return idx != id
        })
        setCats(newArray)
    }
    
    const[formData,setFormData] = useState({
        title : "",
        description : ""
    })
    console.log(formData)
    

    const formHandler=(e)=>{
        const {name,value} = e.target
        setFormData(prev=>({
            ...prev,
            [name] : value
        }))
    }

    function createHandler(e){
        e.preventDefault()
        const sendData = new FormData()
        sendData.append("title",formData.title)
        sendData.append("image",formData.image)
        sendData.append("description",formData.description)
        sendData.append("category",formData.category)
        axios({
            method:"post",
            url : `${url}/post/create`,
            headers : {
                "Authorization" : localStorage.getItem("token"),
                
            },
            data : sendData
        }).then((res)=>{
            toast.success('Blog Created!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
            console.log(res)
            navigate("/profile")
        }).catch((e)=>{
            toast.info('Fill all details', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
        })
    }

    async function imageHandler(e){
        const file = e.target.files[0]
        setImage(file)
    }
 

    return(
        <>
       
        <div className="sm:mx-20 mx-auto w-10/12 mt-10 space-y-10">
        <h1 className="font-bold text-2xl">Create a Post</h1>
        <input type="text" onChange={formHandler}  name="title" placeholder="Enter post title" />
        <input type="file" accept="image/*" name="img" onChange={imageHandler}/>
        <div>
        <input type="text" className="py-1 mr-3 border" placeholder="Enter post category" value={cat} onChange={(e)=>setCat(e.target.value)} />
        <button onClick={clickHandler} className="bg-black px-2 py-1 rounded-sm text-white">ADD</button>
        </div>
        <div className="flex space-x-3"> 
        {cats.map((val,idx)=>{
            return <div key={idx} className="border bg-gray-400 px-2 py-1 flex space-x-2">
                <h1>{val}</h1>
                <button className="" onClick={()=>removeHandler(idx)}><ImCross/></button>
            </div>
        })}
        </div>
        <textarea name="description" onChange={formHandler} placeholder="Enter your text..." className="border outline-none py-2 px-4 w-11/12 sm:w-5/12 sm:h-[30vh]"></textarea>
        
        </div>
        <div className="text-center py-6">
        <button onClick={createHandler}  className="bg-black text-white px-16 py-2">Create</button>
    </div>
        </>
     
    )
}