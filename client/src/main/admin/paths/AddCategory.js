import React, {useState} from 'react'
import Base from "../../core/Base"
import { isAuthenticated } from "../../auth/helper/adminIndex"
import {Link} from "react-router-dom";
import createcategory from "../helper/adminapicall"

export default function AddCategory() {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {admin, token} = isAuthenticated()

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
        createcategory(admin._id, token, {name})
            .then(data => {
                if(data.error){
                    setError(data.error)
                }
                else{
                    setError("")
                    setSuccess(true)
                    setName("")
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
                    Category Created
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
                placeholder="For Ex. Food"
                />
                <button 
                onClick ={onSubmit}
                className="btn btn-outline-info ml-3"> Create Category </button>
            </div>
        </form>
    )




    return (
        <Base
        title="Create a Category"
        description="Add a new Category for new Merchants"
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
