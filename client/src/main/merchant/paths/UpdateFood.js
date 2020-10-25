import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import { misAuthenticated } from "../../auth/helper/merchantIndex"
import {Link,useParams} from "react-router-dom";
import {updatefood,getfood} from "../helper/merchantapicall"

export default function UpdateFood() {

        const {foodId} = useParams()
        const {merchant, token} = misAuthenticated();
    
        const [values, setValues] = useState({
            dishName:"",
            dishDesc:"",
            dishPrice: "",
            dishStock: "",
            photo: "",
            restaurants: "",
            loading: false,
            error: "",
            UpdatedFood: "",
            getaRedirect: false,
            formData: "",
            originalfood:""
        });
    
        const { dishName, dishDesc, dishStock, dishPrice, photo, 
        loading, restaurants, error, UpdatedFood, getaRedirect, formData,originalfood } = values;


        
    
        const preload = () => {
            getfood(foodId, merchant._id,token).then(data => {
              if(data.error){
                setValues({...values, error: data})
              } else{
                setValues({...values, originalfood: data,formData: new FormData()})
                }
            })

        }
    
        useEffect(() => {
            preload();
        }, [] )
         


      const successMessage = () => (
            <div className="alert alert-success mt-3"
                style={{display: UpdatedFood ? "" : "none"}}
            >
                <h4>{UpdatedFood} updated successfully </h4>
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

                      
            updatefood(foodId, token, merchant._id, formData)
            .then(data => {
                if(data.error){
                    setValues({...values, error:data.error})
                }else{
                    setValues({
                        ...values,
                        originalfood: {
                          dishName,
                          dishDesc,
                          dishPrice,
                          dishStock
                        },
                        dishName: "",
                        dishDesc: "",
                        dishPrice: "",
                        dishStock: "",
                        photo: "",
                        loading: false,
                        error: "",
                        UpdatedFood: data.dishName
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
            setValues({...values, [name]:value})
            formData.set(name, value)
          
          };

          
        const updateFoodForm = () => (
            <form className="mt-4">
              <div className="form-group">
              <label className="text-light"> Food Name <span className="text-warning">*</span></label>
                <input
                  onChange={handleChange("dishName")}
                  name="dishName"
                  className="form-control"
                  placeholder={originalfood.dishName}
                  value={dishName}
                />
              </div>
              <div className="form-group">
              <label className="text-light"> Description <span className="text-warning">*</span></label>
                <textarea
                  onChange={handleChange("dishDesc")}
                  name="dishDesc"
                  className="form-control"
                  placeholder={originalfood.dishDesc}
                  value={dishDesc}
                />
              </div>

              <div className="form-group">
              <label className="text-light"> Price <span className="text-warning">*</span></label>
                <textarea
                  onChange={handleChange("dishPrice")}
                  name="dishPrice"
                  className="form-control"
                  placeholder={originalfood.dishPrice}
                  value={dishPrice}
                />
              </div>

              <div className="form-group">
              <label className="text-light"> Stock <span className="text-warning">*</span></label>
                <textarea
                  onChange={handleChange("dishStock")}
                  name="dishStock"
                  className="form-control"
                  placeholder={originalfood.dishStock}
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
                Update Food Item
              </button>
            </form>
          );
        
        
        
        
        
        return(
            <Base
            title="Update the Food Item here!"
            description="Welcome to Food Updation Section"
            className="container bg-success p-4"
            >
            
            <Link to="/merchant/dashboard" className="btn brn-md btn-dark mb-3">
                Restaurant Home
            </Link>
    
            <div className="row bg-dark test-white rounded center">
                <div className="col-md-8 offset-md-20 ">
                    {updateFoodForm()}
                    {successMessage()}
                    {warningMessage()}
                </div>
            </div>
    
            </Base>
        )
    }