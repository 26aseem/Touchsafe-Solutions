import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import { isAuthenticated } from "../../auth/helper/adminIndex"
import {Link,useParams} from "react-router-dom";
import {getcategory, updatecategory} from "../helper/adminapicall"

export default function Updateategory() {

    const {categoryId} = useParams()
    const [name, setName] = useState("")
    const [categoryname, setCategoryname] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {admin, token} = isAuthenticated()

    const preload = () => {
        getcategory(categoryId).then(data => {
          if(data.error){
            setError(data.error)
          } else{
            setCategoryname(data.name);
            }
        })  
      }
  
      useEffect(() => {
        preload()
      },[])


    const goBack = () => (
        <div className="mt-5">
            <Link 
            className="btn btn-sm btn-info mb-3 ml-3"
            to = "/admin/dashboard"
            >
                Admin Dashboard
            </Link>
        </div>
    )

    const handleChange = (event) => {
        setError("");
        setName(event.target.value)
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false)

        //backend request fired
        updatecategory(categoryId,token,admin._id, {name})
            .then(data => {
                if(data.error){
                    setError(data.error)
                }
                else{
                    setError("")
                    setSuccess(true)
                    setName("")
                    setCategoryname(name);
                }
            })
            .catch(data => {
                console.log(data.error)
            })

    };

    const successMessage = () => {
        if(success){
            return (
                <h4 className="text-success">
                    Category Updated
                </h4>
            )
        }
    };

    const warningMessage = () => {
        if(error){
            return (
                <h4 className="text-danger">
                    {error}
                </h4>
                
            )
        }
    };


    const myCategpryForm = () => (
        <form>
            <div className="form-group">
                <p className="text-dark mt-3 ml-3"> Enter the Category <span className="text-info">*</span></p>
                <input type="text"
                className="form-control my-3 ml-3"
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder={categoryname}
                />
                <button 
                onClick ={onSubmit}
                className="btn btn-outline-info ml-3"> Update Category </button>
            </div>
        </form>
    )




    return (
        <Base
        title="Update the Category"
        description="Update the Category"
        className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8">
                {myCategpryForm()}
                {goBack()}
                {successMessage()}
                {warningMessage()}
                
                </div>
            </div>
            
        </Base>
    )
}
