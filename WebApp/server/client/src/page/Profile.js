import React, {useState,useEffect,useContext} from 'react'
import {profileLogo} from "../images/profile_logo.png"
import {UserContext} from "../App"
import M from "materialize-css"
import {API} from "../backend"

export default function Profile() {
    const [post, setPost] = useState([])
    const {state, dispatch} = useContext(UserContext)
    const [image, setImage] = useState("")
       
    
    useEffect(() => {
        fetch(`${API}/mypost`,{
            method: "GET",
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            } 
        }).then(res=>res.json())
        .then(result =>{
            setPost(result.myposts)
        })
    }, [])

    useEffect(() => {
        if(image){
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset","instagram-clone")
            data.append("cloud_name", "dsjv29fpt")
            fetch(" https://api.cloudinary.com/v1_1/dsjv29fpt/image/upload", {
                method: "POST",
                body: data
            }).then(res => res.json())
            .then(data =>{
                document.getElementById("updateProPic").textContent = "Profile Picture Updated"
                fetch(`${API}/updatepic`,{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")

                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                }).then(res=> res.json())
                .then(result=>{
                        localStorage.setItem("user",
                        JSON.stringify({...state,profilePic:data.url}))
                        dispatch({type:"UPDATEPIC",payload:data.url})
                        M.toast({html: 'Profile Picture updated', classes:"#00c853 green accent-4 font-weight-bold"})
                })
                .catch(err=>
                    console.log(err)
                )
                
            })
            .catch(err =>{
                console.log(err)
                M.toast({html: "Could not update ypu profile Picture", classes:"#c62828 red darken-3 font-weight-bold "})
            })
        }
    },[image])


    return (
    
        <div className="container-fluid mt-5">
            <div className="row" style={{borderBottom:"1px solid grey"}}>
                <div className="col-sm-3 offset-sm-1 offset-3 mb-sm-4">
                    <img 
                    src={JSON.parse(localStorage.getItem("user")).profilePic} 
                    style={{width:"160px", height:"160px",borderRadius:"80px"}}
                    alt="Profile"
                    />


                    <div className="file-field input-field ml-0">
                        <div className="btn btn-success pt-0" style={{position:"relative",right:"17px"}}>
                            <span id="updateProPic">Update Profile Picture</span>
                            <input 
                            type="file" 
                            onChange={(event) => setImage(event.target.files[0])}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate propic" type="text"/>
                        </div>
                    </div>

                </div>

                <div className="col-sm-7 offset-sm-1 offset-lg-0 mt-4 offset-2">
                    <h1> {JSON.parse(localStorage.getItem("user")).name} </h1>
                    <h3 style={{color:"grey"}} className={JSON.parse(localStorage.getItem("user")).name.length >6 ? "ml-5" : ""}>
                         @{JSON.parse(localStorage.getItem("user")).username}
                     </h3>                         
                    <div className="row mt-3">
                        <h6 className="mr-4"> {post.length} posts</h6>
                        <h6 className="mr-4"> {JSON.parse(localStorage.getItem("user")).followers ? JSON.parse(localStorage.getItem("user")).followers.length : "0"} followers</h6>
                        <h6 className="mr-4"> {JSON.parse(localStorage.getItem("user")).following ? JSON.parse(localStorage.getItem("user")).following.length : "0"} following</h6>
                    </div>
                </div>
            </div>
        
            <div className="row">
                {
                    post.map((p, index) => {
                        return(
                       <img key={index} className="col-6 mb-4 col-lg-4"  src={p.photo} alt={p.title} title={p.title} style={{minHeight:"200px"}}/>
                        )
                    })
                }               
            </div>
        </div>

    )
}
