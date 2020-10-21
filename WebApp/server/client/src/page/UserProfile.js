import React, {useState,useEffect,useContext} from 'react'
import {profileLogo} from "../images/profile_logo.png"
import {useParams} from "react-router-dom"
import {UserContext} from "../App"
import {API} from "../backend"

const UserProfile = () => {
    const [userProfile, setProfile] = useState(null)
    const {state, dispatch} = useContext(UserContext)
    const {userId} = useParams()
    const fol = JSON.parse(localStorage.getItem("user")).following ? 
                JSON.parse(localStorage.getItem("user")).following.includes(userId):false
    const [showfollow, setShowfollow] = useState(!fol)
    
    
    useEffect(() => {
        
        fetch(`${API}/user/${userId}`,{
            method: "GET",
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            } 
        }).then(res=>res.json())
        .then(result => {
            setProfile(result)
        })
        .catch(err =>{
            console.log(err)
        })
    }, [])

    const followUser = () =>{
        fetch(`${API}/follow`,{
            method:"PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userId
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE", payload:{
                following:data.following,
                followers:data.followers
            }})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setShowfollow(false)
        })
    }

    const unfollowUser = () =>{
        fetch(`${API}/unfollow`,{
            method:"PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                unfollowId: userId
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE", payload:{
                following:data.following,
                followers:data.followers
            }})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>
                    item !== data._id
                )
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setShowfollow(true)
        })
    }


    return (
        <>
        {userProfile ?
        <div className="container-fluid mt-5">
            <div className="row" style={{borderBottom:"1px solid grey"}}>
                <div className="col-sm-3 offset-sm-1 offset-3 mb-sm-4">
                    <img 
                    src={userProfile.user.profilePic} 
                    style={{width:"160px", height:"160px",borderRadius:"80px"}}
                    alt="Profile"
                    />
                </div>

                <div className="col-sm-7 offset-sm-1 offset-lg-0 mt-4 offset-2">
                    <h1> {userProfile.user.name} </h1>
                    <h2 style={{color:"grey"}} className={userProfile.user.name.length >6 ? "ml-5" : ""}> @{userProfile.user.username} </h2>                    
                    <div className="row mt-3">
                        <h6 className="mr-4"> {userProfile.posts.length} posts</h6>
                        <h6 className="mr-4"> {userProfile.user.followers.length} followers</h6>
                        <h6 className="mr-4"> {userProfile.user.following.length} following</h6>
                    </div>

            {showfollow ?
                    <button 
                    className="btn waves-effect waves-light #64b5f6 blue lighten-2 text-white my-3" 
                    onClick={() => followUser()}>
                                Follow
                    </button>
                    :
                    <button 
                    className="btn waves-effect waves-light #64b5f6 blue lighten-2 text-white my-3" 
                    onClick={() => unfollowUser()}>
                                Unfollow
                    </button>
            }
                </div>
            </div>
        
            <div className="row">
                {
                    userProfile.posts.map((p, index) => {
                        return(
                        <img key={index} className="col-6 mb-4 col-lg-4" src={p.photo} alt={p.title} title={p.title} style={{minHeight:"200px"}}/>
                        )
                    })
                }               
            </div>
        </div>
        :
        <h2>
            Loading....
        </h2>
        }
    </>
    )
}

export default UserProfile;