import React, {useState} from"react"
import Base from "../core/Base"
import {Link, Redirect} from "react-router-dom"
import {msignin, mauthenticate, misAuthenticated} from "../auth/helper/merchantIndex"

const MerchantSignin = () => {

    const [values, setValues] = useState({
        username: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    });
    
    const { username, password, error, loading, didRedirect } = values
    const {merchant} = misAuthenticated();


    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false, loading:true})
        msignin({username, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            } else{
                mauthenticate(data, () => {
                    setValues({
                        ...values,
                        didRedirect: true
                    })
                })
            }
        })
        .catch(console.log("Error in Merchant Signin"))
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



    const performRedirect = () => {
        if(didRedirect){
            if(merchant){
                return(
                    <Redirect to="/merchant/dashboard" />
                )
            }
            
        }
        if(misAuthenticated){
            return <redirect to="/" />
        }
    };

    const signIpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light"> Username </label>
                            <input type="text"
                            value={username} onChange={handleChange("username")}
                            className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Password </label>
                            <input type="password"                         
                            value={password} onChange={handleChange("password")}
                            className="form-control"/>
                        </div>
                        <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
                        <button className="btn btn-info btn-block" onClick={onReset}>Reset </button>
                    </form>
                </div>
            </div>
        );
    };

    const loadingMessage = () => (
       loading && (
           <div className="alert alert-info">
               <h2>Loading Merchant Dashboard...</h2>
           </div>
       )
    )

    const errorMessage = () => (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-center">
        <div className="alert alert-danger"
        style={{display: error ? "" : "none"}}
        >
            {error}
        </div>
        </div>
        </div>
    )



    return (
        <Base title="Merchant Sign In" description="A page for merchant to sign in">
            {signIpForm()}
            {performRedirect()}
            {loadingMessage()}
            {errorMessage()}

            
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
}

export default MerchantSignin;