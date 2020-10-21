import React, {useState, useEffect,useContext} from 'react'
import {Link,useHistory} from "react-router-dom"
import { FaHeart} from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import {UserContext} from "../App"
import M from "materialize-css"
import { MdDeleteForever } from "react-icons/md"
import { FaShare } from "react-icons/fa"
import { API } from '../backend';


export default function Home() {
    const history = useHistory();
    const [data, setData] = useState([])
    const {state, dispatch} = useContext(UserContext)
    
    useEffect(()=>{
        fetch(`${API}/followingpost`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result =>{
            setData(result.posts)
        })
    },[])

    // Like Post
    const likePost = (id) => {
        fetch(`${API}/like`, {
            method: "PUT",  
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res=>res.json())
        .then(result =>{
            const newData = data.map(item=>{
                if(item._id === result._id){
                    return result
                } else{
                    return item
                }
            })
            setData(newData)
        })
        .catch(err => {
            console.log(err)
        })
    };

    const unlikePost = (id) => {
        fetch(`${API}/unlike`, {
            method: "PUT",  
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res=>res.json())
        .then(result =>{
            const newData = data.map(item=>{
                if(item._id === result._id){
                    return result
                } else{
                    return item
                }
            })
            setData(newData)
        })
        .catch(err => {
            console.log(err)
        })
    };

    // Comment
    const commentPost = (text,id) => {
        fetch(`${API}/comment`, {
            method: "PUT",  
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                postId: id,
                text: text
            })
        }).then(res=>res.json())
        .then(result =>{
            const newData = data.map(item=>{
                if(item._id === result._id){
                    return result
                } else{
                    return item
                }
               })
            setData(newData)
        })
        .catch(err => {
            console.log(err)
        })
    };

    // Delete Post
    const deletepost = (postId) => {
        fetch(`${API}/deletepost/${postId}`,{
        method: "DELETE",
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }        
        }).then(res=>res.json())
        .then(result => {
            const newData = data.filter(item=>{
                    return item._id !== result.result._id
            })
            setData(newData)
            M.toast({html: "Post deleted successfully", classes:"#00c853 green accent-4 font-weight-bold"})
        })
        .catch(err => {
            console.log(err)
        })
    };


    // Share Post
    const sharePost = (title,body,url) => {
        fetch(`${API}/createpost`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title:title,
                body:body,
                url
            })
        }).then(res=>res.json())
        .then(data => {
            if(data.error){
                M.toast({html: "Post could not be shared", classes:"#c62828 red darken-3 font-weight-bold "})
            }else{
            M.toast({html: 'Post shared Successfully', classes:"#00c853 green accent-4 font-weight-bold"})
        }
        })
        .catch(err => console.log(err));
        
    };



    return (
        
        
        <div className="home">
      { data.length===0 ?  
        <div className="center mt-5" style={{fontFamily: "'Special Elite', cursive"}}>
        <img src="https://res.cloudinary.com/dsjv29fpt/image/upload/v1587791096/rush-7_tfjeuy.png" alt="" style={{maxWidth:"400px",maxHeight:"400px"}}/>
        <h2 className="text-danger">Oops! No Post found</h2>
        <h3 className="text-success">Follow your friends to see more Posts</h3>
        </div>
      : data.map((post, index) =>{
            return(
                <div key={index} className="card home-card">
                    <h5 className="mt-3 ml-2">
                            <Link to={post.postedBy._id !== state._id ? "/profile/" + post.postedBy._id : "/profile"}> 
                                <img 
                                src={post.postedBy.profilePic} 
                                style={{width:"50px", height:"50px",borderRadius:"30px"}}
                                alt="" className="mr-4 ml-2" title={post.postedBy.username}
                                />

                                @{post.postedBy.username} 
                            </Link>
                        {(post.postedBy._id===state._id)?
                        <MdDeleteForever 
                        style={{fontSize:"1.5em",color:"black",float:"right"}} 
                        className="mr-2"
                        onClick={()=>
                        deletepost(post._id)
                        }/> : 
                        ""
                        } </h5>
                    
                    <div className="card image mx-3" style={{height:"350px"}}>
                    
                        <img 
                        src={post.photo} 
                        alt="Post"
                        title={post.title}
                        />
                    
                    </div>
                    <div className="card-content mt-0 pt-0">

                        {post.likes.includes(state._id) ?
                            <FaHeart style={{fontSize:"1.5em",color:"red"}} className="mb-3 mr-3"/> :
                            <FaHeart style={{fontSize:"1.5em",color:"black"}} className="mb-3 mr-3"/>
                        }

                        {post.likes.includes(state._id) ?
                        <AiFillDislike style={{fontSize:"1.5em"}} className="mr-2 mb-3" onClick={()=>unlikePost(post._id)}/> :
                        <AiFillLike style={{fontSize:"1.5em"}} className="mr-2 mb-3" onClick={()=>likePost(post._id)}/>
                        }

                        <FaShare style={{fontSize:"1.5em"}} className="mr-1 mb-3 right" onClick={()=>sharePost(post.title,post.body,post.photo)}/>

                        <h6> {post.likes.length} {post.likes.length>1 ?"Likes":"Like"} </h6>
                        <h6 className="font-weight-bold"> {post.title} </h6>
                        <p className="font-weight-bold">{post.body}</p>

                        {
                            post.comments.map((record,index) => {
                                return(
                                    <h6 key={index} className="mt-2 text-success">
                                        <span className="font-weight-bold text-primary">@{record.postedByUser} </span>
                                        {record.text}    
                                    </h6>
                                )
                            })
                        }

                        <form onSubmit={(event)=>{
                            event.preventDefault()
                            commentPost(event.target[0].value, post._id)
                            }}>
                        <input type="text" placeholder="Add a Comment"/>
                        </form>
                    </div>
                </div>
            
            )
            })
        }

    </div>        
        
        
    )
}
