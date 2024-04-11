import axios from "axios";
import { useState,useEffect} from "react"
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../custom Hooks/useAuth";
import {toast} from "react-toastify"

export function EditPost(){
    const[formData,setFormData] = useState({
        title : "",
        description : ""
    })

    console.log(formData)

    const {id} = useParams()
    const navigate = useNavigate()
    const[cat,setCat] = useState("")
    const[cats,setCats] = useState([])
    const[image,setImage] = useState("")
    console.log(image)
    useAuth(`/edit/${id}`,"/register")

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            category: cats
        }));
    }, [cats]);

    useEffect(()=>{
        setFormData(prev=>({
            ...prev,
            image : image
        }))
    },[image])
    
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
    
  
    console.log(formData)
    console.log(cats)

    const formHandler=(e)=>{
        const {name,value} = e.target
        setFormData(prev=>({
            ...prev,
            [name] : value
        }))
    }
    function editHandler(){
        const sendData = new FormData()
        sendData.append("title",formData.title)
        sendData.append("image",formData.image)
        sendData.append("description",formData.description)
        sendData.append("category",formData.category)
       axios({
        method : "put",
        url : `http://localhost:3000/post/updatePost/${id}`,
        data : sendData
       })
       .then((res)=>{
        toast.success('Blog Updated!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
        console.log(res.data)
        navigate("/profile")

       })
    }
    return(
        <>
        <div className="sm:mx-20 mx-auto w-10/12 mt-10 space-y-10">
        <h1 className="font-bold text-2xl">Update a Post</h1>
        <input type="text" onChange={formHandler} name="title" placeholder="Enter post title" />
        <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])}/>
        <div>
        <input type="text" className="py-1 mr-3 border" placeholder="Enter post category" value={cat} onChange={(e)=>setCat(e.target.value)} />
        <button onClick={clickHandler} className="bg-black px-2 py-1 rounded-sm text-white">ADD</button>
        </div>
        <div className="flex space-x-3"> 
        {cats.map((val,idx)=>{
            return <div className="border bg-gray-400 px-2 py-1 flex space-x-2">
                <h1>{val}</h1>
                <button className="" onClick={()=>removeHandler(idx)}><ImCross/></button>
            </div>
        })}
        </div>
        <textarea name="description" onChange={formHandler} placeholder="Enter your text..." className="border outline-none py-2 px-4 w-11/12 sm:w-5/12 sm:h-[30vh]"></textarea>
        
        </div>
        <div className="text-center py-6">
        <button onClick={editHandler} className="bg-black text-white px-16 py-2">Update</button>
    </div>
        </>
        
    )
}