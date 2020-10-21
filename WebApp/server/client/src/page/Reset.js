import React, {useState, useEffect} from 'react'
import {Link, useHistory} from "react-router-dom"
import {UserContext} from "../App" 
import {FaUserCircle} from "react-icons/fa";
import M from "materialize-css"
import {API} from "../backend"

export default function Reset() {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const PostData = () =>{
        setLoading(true)
        fetch(`${API}/resetpassword`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
            }).then(response => {
                return response.json();
                })
            .then(data => {
            setLoading(false)
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3 font-weight-bold "})
            }else{
            setEmail("")
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
                type="text"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
                

            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 text-white my-3" onClick={() => PostData()}>
                Reset Password
            </button>

            <h6>
                Don't have an account? &nbsp; 
                <Link to="/signup"><span className="blue-text text-darken-2">Sign up</span> </Link>
            </h6>
            </div>
        </div>
        <center>
        {loadingMessage()}
        </center>
    </div>
        
    )
}
