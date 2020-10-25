import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import { misAuthenticated } from "../../auth/helper/merchantIndex"
import {Link} from "react-router-dom";
import {createfood, getmerchant} from "../helper/merchantapicall"

export default function AddFood() {

        const {merchant, token} = misAuthenticated();
    
        const [values, setValues] = useState({
            dishName:"",
            dishDesc:"",
            dishPrice: "",
            dishStock: "",
            photo: "",
            rest: "",
            restaurants: "",
            loading: false,
            error: "",
            CreatedFood: "",
            getaRedirect: false,
            formData: ""
        });
    
        const { dishName, dishDesc, dishStock, dishPrice, photo, 
          rest, loading, restaurants, error, CreatedFood, getaRedirect, formData } = values;


        
    
        const preload = () => {
            getmerchant(merchant._id, token).then(data=>{
                if(data.error) {
                    setValues({...values, error: data})
                } else{
                    setValues({...values,rest:data._id,formData: new FormData()});
                                                        
               }
            })
        }
    
        useEffect(() => {
            preload();
        }, [] )
         


      const successMessage = () => (
            <div className="alert alert-success mt-3"
                style={{display: CreatedFood ? "" : "none"}}
            >
                <h4>{CreatedFood} created successfully </h4>
            </div>
        )
    
        const warningMessage = () => (
            <div className="alert alert-danger mt-3"
                style={{display: error ? "" : "none"}}
            >
                <h4> {error} </h4>
            </div>
        )
    
        const onSubmit = (event) => {
          
            event.preventDefault();
            setValues({...values, error: "", loading: true})
            formData.set('rest', rest)
            createfood(merchant._id, token, formData)
            .then(data => {
                if(data.error){
                    setValues({...values, error:data.error})
                }else{
                    setValues({
                        ...values,
                        dishName: "",
                        dishDesc: "",
                        dishPrice: "",
                        dishStock: "",
                        photo: "",
                        rest: "",
                        loading: false,
                        error: "",
                        CreatedFood: data.dishName
                    })
                }
            }
    
            )
            .catch(
              console.log("Error Found")
            )
        }
    
        const handleChange = name => event => {
            const value = name ==="photo" ? event.target.files[0] : event.target.value
            formData.set(name, value)
            setValues({...values, [name]:value})
          
          };

          

        const createFoodForm = () => (
            <form className="mt-4">
              <div className="form-group">
              <label className="text-light"> Food Name <span className="text-warning">*</span></label>
                <input
                  onChange={handleChange("dishName")}
                  name="dishName"
                  className="form-control"
                  placeholder="Food Name"
                  value={dishName}
                />
              </div>
              <div className="form-group">
              <label className="text-light"> Description <span className="text-warning">*</span></label>
                <textarea
                  onChange={handleChange("dishDesc")}
                  name="dishDesc"
                  className="form-control"
                  placeholder="Description"
                  value={dishDesc}
                />
              </div>

              <div className="form-group">
              <label className="text-light"> Price <span className="text-warning">*</span></label>
                <textarea
                  onChange={handleChange("dishPrice")}
                  name="dishPrice"
                  className="form-control"
                  placeholder="Price"
                  value={dishPrice}
                />
              </div>

              <div className="form-group">
              <label className="text-light"> Stock <span className="text-warning">*</span></label>
                <textarea
                  onChange={handleChange("dishStock")}
                  name="dishStock"
                  className="form-control"
                  placeholder="Stock"
                  value={dishStock}
                />
              </div>
              
              <span className="text-white"> Dish Photo </span>
              <div className="form-group">
                <label className="btn btn-block btn-success">
                  <input
                    onChange={handleChange("photo")}
                    type="file"
                    name="photo"
                    accept="image"
                    placeholder="Choose an Image for the Food"
                  />
                </label>
              </div>
              
              <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-4">
                Create Food Item
              </button>
            </form>
          );
        
        
        
        
        
        return(
            <Base
            title="Add the Food Item here!"
            description="Welcome to Food Addition Section"
            className="container bg-success p-4"
            >
            
            <Link to="/merchant/dashboard" className="btn brn-md btn-dark mb-3">
                Restaurant Home
            </Link>
    
            <div className="row bg-dark test-white rounded center">
                <div className="col-md-8 offset-md-20 ">
                    {createFoodForm()}
                    {successMessage()}
                    {warningMessage()}
                </div>
            </div>
    
            </Base>
        )
    }