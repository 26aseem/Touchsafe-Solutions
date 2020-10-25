import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import {Link} from "react-router-dom"
import { isAuthenticated } from '../../auth/helper/adminIndex';
import { getcategories, deletecategory } from '../helper/adminapicall';

export default function ManageCategories() {

  
    const [categories, setcategories] =useState([]);

    const {admin, token} = isAuthenticated();
   
    const preload = () => {
        getcategories().then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                setcategories(data);
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const deleteThisCategory = (merchantId) => {
      deletecategory(merchantId,admin._id,token)
        .then(data=> {
            if(data.error){
                console.log(data.error)
            }
            else{
                preload();
            }
        })
    }


    return (
        <Base title="Welcome Admin" description="Manage Categories here">
        <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-success my-3 mt-5 mb-5">Categories</h2>

            {categories.map((category, index) => (
              
                <div key={index} className="row text-center mb-2 ml-3 ">
                
                  <div className="col-1">
                    <Link
                      className="btn btn-success"
                      to={`/admin/update/category/${category._id}`}
                    >
                    <span className="">Update</span>
                    </Link>
                  </div>
                
                <div className="col-1">
                  <button onClick={() => {
                      deleteThisCategory(category._id)
                  }} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              
                <div className="col-7 offset-1">
                    <h3 className="text-white text-left">{category.name}</h3>
                </div>

              </div>
           
            ))
                }
          
        </div>
      </div>
    </Base>
    )
}
