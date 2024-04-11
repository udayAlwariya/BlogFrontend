import { config } from "./config"

export function Profilepost({post}){
    return(
        <>
         <div className="xl:flex mt-10 w-9/12 mx-auto">
            <img src={`${config.url}/images/${post.image}`} className={`${(window.innerWidth>1240)?"w-[300px]":"w-12/12"}`} alt="" />
            <div className="ml-2">
                <h1 className="font-bold text-xl">{post.title}</h1>
                <div className="flex justify-between text-gray-400 text-sm">

                <p>{post.username}</p>
                </div>
                <h1>{post.description}</h1>
            </div>
        </div>
        </>
    )
}