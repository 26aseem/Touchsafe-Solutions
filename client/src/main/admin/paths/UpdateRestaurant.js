import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import { Link ,useParams} from "react-router-dom"
import { updatemerchant, getmerchant } from "../helper/adminapicall"
 

export default function UpdateRestaurant() {

    const {merchantId} = useParams()

    const [values, setValues] = useState({
        m: "",
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
        UpdatedMerchant: "",
        getaRedirect: false,
        formData: ""
    });

    const {  m, merchantName, ownerName, city, state, country, streetAddress, pincode, contact,
      altcontact,description,merchantPhoto, email, username, password, loading, 
      error, UpdatedMerchant, getaRedirect, formData } = values;

    const preload = () => {
        getmerchant(merchantId).then(data => {
          if(data.error) {
              console.log(data.error);
          }else{
              setValues({...values, m: data, formData: new FormData()})
          }
      })

    }

    useEffect(() => {
        preload();
    }, [] )

    const successMessage = () => (
        <div className="alert alert-success mt-3"
            style={{display: UpdatedMerchant ? "" : "none"}}
        >
            <h4>{UpdatedMerchant} updated successfully </h4>
        </div>
    )

    const warningMessage = () => (
        <div className="alert alert-danger mt-3"
            style={{display: error ? "" : "none"}}
        >
            <h4>{error} </h4>
        </div>
    )

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true})

        updatemerchant(merchantId,formData)
        .then(data => {
          if(data.error){
              setValues({...values, error:data.error,UpdatedMerchant: ""})
          }else{
              setValues({
                  ...values,
                  m: {
                      merchantName,
                      ownerName,
                      city,
                      state,
                      country,
                      streetAddress,
                      pincode,
                      contact,
                      altcontact,
                      description,
                      merchantPhoto,
                      email,
                      username,
                      password    
                  },
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
                  UpdatedMerchant: data.merchantName
              })
          }
      }

      )
      .catch(console.log("Error"))
      
  }

    const handleChange = name => event => {
        const value = name ==="merchantPhoto" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]:value})
    };
    
    const updateProductForm = () => (
        <form className="mt-4">
          <div className="form-group">
                            <label className="text-light"> Restaurant Name <span className="text-warning">*</span></label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("merchantName")}
                            value={merchantName}
                            name={merchantName}
                            placeholder={m.merchantName}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Owner Name <span className="text-warning">*</span></label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("ownerName")}
                            value={ownerName}
                            name={ownerName}
                            placeholder={m.ownerName}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Street Address <span className="text-warning">*</span></label>
                            <input type="text" className="form-control"
                            onChange={handleChange("streetAddress")}
                            value={streetAddress}
                            name={streetAddress}
                            placeholder={m.streetAddress}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> City <span className="text-warning">*</span></label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("city")}
                            value={city}
                            name={city}
                            placeholder={m.city}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> State <span className="text-warning">*</span></label>
                            <input type="text" className="form-control"
                            onChange={handleChange("state")}
                            value={state}
                            name={state}
                            placeholder={m.state}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Country <span className="text-warning">*</span></label>
                            <input type="text" className="form-control"
                            onChange={handleChange("country")}
                            value={country}
                            name={country}
                            placeholder={m.country}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="text-light"> Pincode <span className="text-warning">*</span></label>
                            <input type="number" className="form-control"
                            onChange={handleChange("pincode")}
                            value={pincode}
                            name={pincode}
                            placeholder={m.pincode}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Contact <span className="text-warning">*</span></label>
                            <input type="number" className="form-control"
                            onChange={handleChange("contact")}
                            value={contact}
                            name={contact}
                            placeholder={m.contact}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="text-light">Alternate Contact </label>
                            <input type="number" className="form-control"
                            onChange={handleChange("altcontact")}
                            value={altcontact}
                            name={altcontact}
                            placeholder={!m.altcontact ? "Alternate Contact" : m.altcontact}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="text-light"> Description </label>
                            <textarea className="form-control"
                            onChange={handleChange("description")}
                            value={description}
                            name={description}
                            placeholder={!m.description ? "Restaurant Description" : m.description}
                            />
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
                            placeholder={m.username}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Email </label>
                            <input type="email" className="form-control"
                            onChange={handleChange("email")}
                            value={email}
                            name={email}
                            placeholder={m.email}
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
                        
          
          <span className="text-white">Post Merchant Photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("merchantPhoto")}
                type="file"
                name="merchantPhoto"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-4">
            Update Restaurant
          </button>
        </form>
      );
    
    
    
    
    
    return(
        <Base
        title="Update the Merchant here!"
        description="Welcome to Merchant Updation Section"
        className="container bg-success p-4"
        >
        
        <Link to="/admin/dashboard" className="btn brn-md btn-dark mb-3">
            Admin Home
        </Link>

        <div className="row bg-dark test-white rounded center">
            <div className="col-md-8 offset-md-20 ">
                {updateProductForm()}
                {successMessage()}
                {warningMessage()}
            </div>
        </div>

        </Base>
    )
}