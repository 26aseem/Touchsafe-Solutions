import React, {useState, useEffect} from"react"
import Base from "../../core/Base"
import {Link} from "react-router-dom"
import { getcategories} from "../../admin/helper/adminapicall"
import { misAuthenticated, msignout } from '../../auth/helper/merchantIndex';
import { getmerchant, updatemerchant } from '../../merchant/helper/merchantapicall';


const ManageRestaurant = () => {

    const {merchant, token} = misAuthenticated();

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
        category: "",
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
      altcontact,description,merchantPhoto, email, username, password, category, loading, 
      error, UpdatedMerchant, getaRedirect, formData } = values;

    const preload = () => {
      
        getmerchant(merchant._id,token).then(data => {
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

    
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true})

        // Update Merchant Here
        
        updatemerchant(merchant._id, token, formData)
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
        style={{display: UpdatedMerchant ? "" : "none"}}
        >
            Restaurant Details updated successfully.
            
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
        <Base title="Restaurant Update Form" description="Update your Details Here">
            {signUpForm()}
            {successMessage()}
            {errorMessage()}
            
            
        </Base>
    );
}

export default ManageRestaurant;