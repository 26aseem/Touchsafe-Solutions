import React, {useState, useEffect} from 'react'
import {Link, useHistory,useParams} from "react-router-dom"
import {FaUserCircle} from "react-icons/fa";
import M from "materialize-css"
import {API} from "../backend"

export default function NewPassword() {
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const {token} = useParams()
    
    const PostData = () =>{
        setLoading(true)
        fetch(`${API}/updatepassword`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
            }).then(response => {
                return response.json();
                })
        .then(data => {
            setLoading(false)
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3 font-weight-bold "})
            }else{
            setPassword("")
            M.toast({html: data.message, classes:"#00c853 green accent-4 font-weight-bold"})
            history.push('/login')
        }
        })
        .catch(err => console.log(err));
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
                type="password"
                placeholder="Enter new Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />

            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 text-white my-3" onClick={() => PostData()}>
                Update Password
            </button>

            </div>
        </div>
        <center>
        {loadingMessage()}
        </center>
    </div>
        
    )
}
