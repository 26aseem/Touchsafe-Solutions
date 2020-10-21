import React, {useState, useEffect} from 'react'
import {Link,useHistory} from "react-router-dom"
import M from 'materialize-css'
import {API} from "../backend"

export default function Signup() {
    const history = useHistory()
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    const [loading,setLoading] = useState(false)
    useEffect(() =>{
        if(url){
            uploadFields()
        }
    },[url])

    const uploadPic = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset","instagram-clone")
        data.append("cloud_name", "dsjv29fpt")
        fetch(" https://api.cloudinary.com/v1_1/dsjv29fpt/image/upload", {
            method: "POST",
            body: data
        }).then(res => res.json())
        .then(data =>{
            setUrl(data.url)
    })
    .catch(err =>{
        console.log(err)
    })
    }

    const uploadFields = () =>{
        if(email && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: 'Invalid Email', classes:"#c62828 red darken-3 font-weight-bold "})
            return
        }

        setLoading(true)
        fetch(`${API}/signup`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                username,
                url:url
                
            })
            }).then(response => {
                return response.json();
                })
        .then(data => {
            setLoading(false)
            if(data.error){
                console.log(data.error)
                M.toast({html: data.error, classes:"#c62828 red darken-3 font-weight-bold "})
            }else{
            setName("")
            setEmail("")
            setUsername("")
            setPassword("")
            M.toast({html: data.message, classes:"#00c853 green accent-4 font-weight-bold"})
            history.push('/login')
        }
        })
        .catch(err => console.log(err));
    }

    const PostData = () =>{
        if(image){
            uploadPic()
        }
        else{
            uploadFields()
        }
        
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
    <div className="container">
      <div className="mycard">
            <div className="card auth-card input-field">
                <h2 className="instagram-text">Instagram</h2>
                <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                />
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />

                <div className="file-field input-field">
                    <div className="btn btn-success pt-0">
                        <span>Upload Profile Picture</span>
                        <input 
                        type="file" 
                        onChange={(event) => setImage(event.target.files[0])}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate propic" type="text"/>
                    </div>
                </div>


    <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 text-white my-4" onClick={() => PostData()}>
        Signup
    </button>
    <h6>
        Have an account? &nbsp; 
        <Link to="/login"><span className="blue-text text-darken-2">Log in</span> </Link>
    </h6>
 </div>
</div>

    <center>
        {loadingMessage()}
    </center>
</div>


    )
}
