import React, {useState, useEffect} from"react"
import Base from "../core/Base"
import {Link} from "react-router-dom"
import { getcategories, createmerchant } from "../admin/helper/adminapicall"


const MerchantSignup = () => {

    const [values, setValues] = useState({
        merchantName: "",
        ownerName: "",
        city: "",
        state: "",
        country: "",
        streetAddress: "",
        pincode: "",
        contact: "",
        altcontact: "",
        category: "",
        categories: [],
        description: "",
        merchantPhoto: "",
        email: "",
        username: "",
        password: "",
        loading: false,
        error: "",
        CreatedMerchant: "",
        getaRedirect: false,
        formData: ""
    });

    const {  merchantName, ownerName, city, state, country, streetAddress, pincode, contact,
      altcontact,description,merchantPhoto, email, username, password, category, categories, loading, 
      error, CreatedMerchant, getaRedirect, formData } = values;

    const preload = () => {
        getcategories().then(data=>{
            if(data.error) {
                setValues({...values, error: data})
            } else{
                setValues({...values, categories: data, formData: new FormData()});
              
            }
        })
    }

    useEffect(() => {
        preload();
    }, [] )

    
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true})
        
        createmerchant(formData)
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error,CreatedMerchant: ""})
            }else{
                setValues({
                    ...values,
                    merchantName: "",
                    ownerName: "",
                    city: "",
                    state: "",
                    country: "",
                    streetAddress: "",
                    pincode: "",
                    contact: "",
                    altcontact: "",
                    description: "",
                    merchantPhoto: "",
                    email: "",
                    username: "",
                    password: "",
                    loading: false,
                    error: "",
                    CreatedMerchant: data.merchantName
                })
            }
        }

        )
        .catch(console.log("data.error"))
    }

    const handleChange = name => event => {
        const value = name ==="merchantPhoto" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]:value})
    };
    
    const onReset = event => {
        event.preventDefault()
        setValues({
                    ...values,
                    merchantName: "",
                    ownerName: "",
                    city: "",
                    state: "",
                    country: "",
                    streetAddress: "",
                    pincode: "",
                    contact: "",
                    altcontact: "",
                    category: "",
                    description: "",
                    merchantPhoto: "",
                    email: "",
                    username: "",
                    password: "",
                    error: "",
                    success: false
                });
            };



    const signUpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light"> Restaurant Name <span className="text-warning">*</span></label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("merchantName")}
                            value={merchantName}
                            name={merchantName}
                            placeholder="Merchant Name"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Owner Name <span className="text-warning">*</span></label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("ownerName")}
                            value={ownerName}
                            nmae={ownerName}
                            placeholder="Owner Name"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Street Address <span className="text-warning">*</span></label>
                            <input type="text" className="form-control"
                            onChange={handleChange("streetAddress")}
                            value={streetAddress}
                            name={streetAddress}
                            placeholder="Country"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> City <span className="text-warning">*</span></label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("city")}
                            value={city}
                            name={city}
                            placeholder="City"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> State <span className="text-warning">*</span></label>
                            <input type="text" className="form-control"
                            onChange={handleChange("state")}
                            value={state}
                            name={state}
                            placeholder="State"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Country <span className="text-warning">*</span></label>
                            <input type="text" className="form-control"
                            onChange={handleChange("country")}
                            value={country}
                            name={country}
                            placeholder="Country"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="text-light"> Pincode <span className="text-warning">*</span></label>
                            <input type="number" className="form-control"
                            onChange={handleChange("pincode")}
                            value={pincode}
                            name={pincode}
                            placeholder="Pincode"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Contact <span className="text-warning">*</span></label>
                            <input type="number" className="form-control"
                            onChange={handleChange("contact")}
                            value={contact}
                            name={contact}
                            placeholder="Contact"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="text-light">Alternate Contact </label>
                            <input type="number" className="form-control"
                            onChange={handleChange("altcontact")}
                            value={altcontact}
                            name={altcontact}
                            placeholder="Alternate Contact"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="text-light"> Description </label>
                            <textarea className="form-control"
                            onChange={handleChange("description")}
                            value={description}
                            name={description}
                            placeholder="Merchant Description"
                            />
                        </div>

                        <div className="form-group">
                        <label className="text-light"> Category <span className="text-warning">*</span></label>
                            <select
                            onChange={handleChange("category")}
                            className="form-control"
                            placeholder="Category"
                            >
                            <option>Select the Category</option>
                            {categories && categories.map((cate, index) =>{
                                return(
                                <option key={index} value={cate._id}>
                                    {cate.name}
                                </option>
                            )
                            })}   
                            </select>
                            </div>


                        <div className="form-group">
                            <label className="text-light"> Restaurant Photo </label>
                            <input type="file" className="form-control"
                            onChange={handleChange("merchantPhoto")}
                            accept="image"
                            name={merchantPhoto}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Username </label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("username")}
                            value={username}
                            name={username}
                            placeholder="Username"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Email </label>
                            <input type="email" className="form-control"
                            onChange={handleChange("email")}
                            value={email}
                            name={email}
                            placeholder="Email"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Password </label>
                            <input type="password" className="form-control"
                            onChange={handleChange("password")}
                            value={password}
                            name={password}
                            placeholder="Password"
                            />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block ">Submit</button>
                        <button className="btn btn-info btn-block mt-3" onClick={onReset}>Reset </button>
                    </form>
                </div>
            </div>
        );
    };

    const successMessage = () => (
        <div className="row mt-3">
            <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-success"
        style={{display: CreatedMerchant ? "" : "none"}}
        >
            New Restaurant Added successfully.
            <Link to="/merchantsignin">Login Here</Link>
        </div>
        </div>
        </div>
    )

    const errorMessage = () => (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger"
        style={{display: error ? "" : "none"}}
        >
            {error}
        </div>
        </div>
        </div>
    )



    return (
        <Base title="Restaurant Sign Up" description="A page for Restaurant to sign up">
            {signUpForm()}
            {successMessage()}
            {errorMessage()}
            
            
        </Base>
    );
}

export default MerchantSignup;