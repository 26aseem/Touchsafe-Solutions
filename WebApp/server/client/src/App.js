import React, {useEffect, createContext, useReducer, useContext} from 'react';
import './App.css';
import Navbar from "./component/Navbar"
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom"
import Home from "./page/Home"
import Profile from "./page/Profile"
import Login from "./page/Login"
import Signup from "./page/Signup"
import CreatePost from './page/CreatePost';
import {reducer, initialState} from "./reducers/userReducer"
import UserProfile from './page/UserProfile';
import SubscribedUser from './page/SubscribedUser';
import Reset from './page/Reset';
import NewPassword from './page/NewPassword';

require('dotenv').config();

export const UserContext = createContext()

const Routing = () =>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push('/')
    } else{
      if(!history.location.pathname.startsWith('/reset'))
      { 
        history.push('/login')
      }
    }
  }, [])
  return(
    <Switch>
      <Route exact path="/"> <Home/> </Route>
      <Route exact path="/profile"> <Profile/> </Route>
      <Route path="/login"> <Login/> </Route>
      <Route path="/signup"> <Signup/> </Route>
      <Route path="/createpost"> <CreatePost/> </Route>
      <Route exact path="/profile/:userId"> <UserProfile/> </Route>
      <Route path="/friendPosts"> <SubscribedUser/> </Route>
      <Route exact path="/resetpassword"><Reset/></Route>
      <Route path="/reset/:token"><NewPassword/></Route>
      
  </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
