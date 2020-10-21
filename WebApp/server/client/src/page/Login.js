import React, {useState, useEffect,useContext} from 'react'
import {Link, useHistory} from "react-router-dom"
import {UserContext} from "../App" 
import {FaUserCircle} from "react-icons/fa";
import M from "materialize-css"
import {API} from "../backend"

export default function Login() {
  
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const PostData = () =>{
        setLoading(true)
        fetch(`${API}/signin`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                username
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
            setUsername("")
            setPassword("")
            localStorage.setItem("jwt", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            dispatch({type: "USER", payload:data.user})
            M.toast({html: 'Login Successful', classes:"#00c853 green accent-4 font-weight-bold"})
            history.push('/')
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

            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 text-white my-3" onClick={() => PostData()}>
                Login
            </button>

            <h6>
                Don't have an account? &nbsp; 
                <Link to="/signup"><span className="blue-text text-darken-2">Sign up</span> </Link>
            </h6>

            <h6 className="mt-3">
                <Link to="/resetpassword"><span className="text-darken-2" style={{color:"#3b5998"}}>Forgot Password?</span> </Link>
            </h6>

            </div>
        </div>
        <center>
        {loadingMessage()}
        </center>
    </div>
        
    )
}
