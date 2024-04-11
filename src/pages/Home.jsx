import axios from "axios"
import { useEffect} from "react"
import { Link } from "react-router-dom"
import { Loader } from "../Loader/Loader"
import { useRecoilState } from "recoil"
import { postAtom } from "../atom"

export function Home(){
    const url = "https://blogbackend-0qmc.onrender.com"
    const [posts,setPosts] = useRecoilState(postAtom)
    useEffect(()=>{
        axios({
            method : "get",
            url : `${url}/post/allPosts`
        }).then((res)=>{
            setPosts(res.data.allPosts)
        }).catch(()=>{
            console.log("error")
        })
    },[])
    if(posts.length==0){
        return <div className="text-center mt-[30vh]"><Loader></Loader></div>
    }else{
        return (
            <>
               {posts.map((post,index)=>{
                return <Link key={index} to={`/postDetails/${post._id}`}><Posts post={post}/></Link>
            })}
            </>   
        )
    }
   
}

function Posts({post}){
    const url = "https://blogbackend-0qmc.onrender.com"
    return(
        <>
            <div className="flex-row mt-10 w-9/12 md:flex mx-auto">
            <img src={`${url}/images/${post.image}`} className="md:w-4/12  w-full"  alt="" />
            <div className="ml-2">
                <h1 className="font-bold text-xl">{post.title}</h1>
                <div className="flex justify-between text-gray-400 text-sm">

                <p>@{post.username}</p>
                </div>
                {window.innerWidth<=1024 ?<h1>{post.description.substring(0,150)}<span className="font-semibold">...READ MORE</span></h1>:<h1>{post.description}</h1> }
                
            </div>
        </div>
        </>
    )
}