import React, {useState,useEffect} from 'react'
import M from "materialize-css"
import {useHistory} from "react-router-dom"
import {API} from "../backend"

export default function CreatePost() {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body ,setBody] = useState("")
    const [image, setImage] = useState("")
    const [loading,setLoading] = useState(false)
    
    const postDetails = () =>{
        setLoading(true)
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset","instagram-clone")
        data.append("cloud_name", "dsjv29fpt")
        fetch(" https://api.cloudinary.com/v1_1/dsjv29fpt/image/upload", {
            method: "POST",
            body: data
        }).then(res => res.json())
        .then(data =>{
            fetch(`${API}/createpost`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title:title,
                body:body,
                url:data.url
            })
        }).then(res=>res.json())
        .then(data => {
            setLoading(false)
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3 font-weight-bold "})
            }else{
            setTitle("")
            setBody("")
            setImage("")
            M.toast({html: 'Post created Successfully', classes:"#00c853 green accent-4 font-weight-bold"})
            history.push('/')
        }
        })
        .catch(err => console.log(err));
            }
        )
        .catch(err => {
            console.log(err)
        })

        
    };
    
    const loadingMessage = () => (
        loading && (
            
    <div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-blue">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>

    <div class="spinner-layer spinner-red">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>

    <div class="spinner-layer spinner-yellow">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>

    <div class="spinner-layer spinner-green">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
      
        )
     )




    return (
    <div className="container ">
        <div 
        className="card input-field "
        style={{
            margin: "10px auto",
            maxWidth: "480px",
            padding: "20px",
            textAlign: "center"
        }}
        >
            
            <h1 className="instagram-text">New Post</h1>

            <input 
            type="text" 
            placeholder="Title of the Post"
            value={title}
            onChange={(event) =>setTitle(event.target.value)}
            />
            
            <textarea 
            placeholder="Body of the Post" 
            style={{border: "0", borderBottom: "1px solid grey"}}
            value={body}
            onChange={(event) =>setBody(event.target.value)}
            />

            <div className="file-field input-field">
                <div className="btn btn-success pt-0">
                    <span>Upload Image</span>
                    <input 
                    type="file" 
                    onChange={(event) => setImage(event.target.files[0])}
                    />
                </div>
            <div className="file-path-wrapper">
                <input className="file-path validate propic" type="text"/>
            </div>
            </div>

            <button 
            className="btn btn-info"
            onClick={()=>postDetails()}
            >
                Create Post
            </button>
        </div>

        <center className="mt-5">
            {loadingMessage()}
        </center>
    </div>
    )
}
