import React, {Fragement,useContext,useState,useRef,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from "../App"
import { Fragment } from 'react'
import M from "materialize-css"
import { GiHamburgerMenu } from "react-icons/gi";
import { MdSearch,MdClose } from "react-icons/md"
import { API } from '../backend'



export default function Navbar() {

    const searchModal = useRef(null)

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
      });

    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const [info,setInfo] = useState(undefined)
    const [search, setSearch] = useState("")
    const [userDetails,setUserDetails] = useState([])

    useEffect(() =>{
        M.Modal.init(searchModal.current)

    },[])

    const findFriend = (text) => {
        setSearch(text)
        fetch(`${API}/searchusers`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                info:text
            })
        }).then(res=>res.json())
        .then(result=>{
            setUserDetails(result.user)   
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const renderList = () => {
        if(state){
            return[
                <Fragment>
                <li className="mr-4"> 
                    <MdSearch style={{fontSize:"20px",color:"black"}} data-target="modal1" className="modal-trigger ml-4 sidenav-close "/>
                </li>
                <li><Link to="/" className="sidenav-close">Home</Link></li>
                <li><Link to="/profile" className="sidenav-close">Profile</Link></li>
                <li><Link to="/friendPosts" className="sidenav-close">Friends</Link> </li>
                <li><Link to="/createpost" className="sidenav-close">New Post</Link></li>
                <li className="sidenav-close ml-4 ml-m-0">
                    <button 
                    className="btn btn-danger mr-2 mb-2"
                    onClick={()=> {
                    localStorage.removeItem("jwt")
                    localStorage.removeItem("user")
                    dispatch({type:"CLEAR"})
                    history.push('/login')
                    M.toast({html: "You have been logged out successfully", classes:"#00c853 green accent-4 font-weight-bold"})
                    }}
                    >
                        Logout
                    </button>
                </li>
                </Fragment>
            ]
        } else{
            return[
                <Fragment>
                <li><Link to="/login" className="sidenav-close">Login</Link></li>
                <li><Link to="/signup" className="sidenav-close">Signup</Link></li>

                </Fragment>    
            ]
        }
    }


    
    return (
    <nav>
        <div className="nav-wrapper white" >
            <Link to={state?"/":"/login"} className="brand-logo left instagram-text ml-4">Instagram</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {renderList()}
            </ul>
            
            <ul className="sidenav" id="slide-out">
                {renderList()}
            </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger right"><GiHamburgerMenu style={{fontSize:"20px"}} className="mr-3"/></a>
        </div>

        <div id="modal1" className="modal container" ref={searchModal}>
            <div className="modal-content black-text input-field my-3" style={{maxHeight:"380px",minHeight:"300px",height:"auto"}}>
                <input type="text"
                    placeholder="Search Your Friends..."
                    value={search}
                    onChange={(event) => findFriend(event.target.value)}
                    />
                <div className="collection" style={{overflowY: "scroll",minHeight: "230px"}} >
                   {userDetails.map(item=>{
                       
                       return(
                        <Link to={item._id === JSON.parse(localStorage.getItem("user"))._id ? "/profile" : "/profile/"+item._id} onClick={()=>{
                            M.Modal.getInstance(searchModal.current).close()
                            setSearch("")
                            setUserDetails([])
                        }}>
                            <div className="collection-item">
                            <img 
                                src={item.profilePic} 
                                style={{width:"50px", height:"50px",borderRadius:"30px"}}
                                className="mr-4 ml-2" title={item.username}
                                alt={item.username}
                                />
                                {item.name}
                            
                             </div>                                       
                        </Link>
                       )
                   })}
                   
                    
                    
    
                </div>
                
            </div>
            <div className="modal-footer">
                <button className="modal-close btn btn-info"
                    onClick={()=>setSearch("")}
                >Close</button>
            </div>
        </div>

    </nav>
        
    )
}
