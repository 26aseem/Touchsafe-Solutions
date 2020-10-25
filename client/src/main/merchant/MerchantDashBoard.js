import React, {useState, useEffect}  from 'react'
import Base from "../core/Base"
import { misAuthenticated } from "../auth/helper/merchantIndex"
import {Link} from 'react-router-dom'
import {downloadQRCode,getmerchant,createQR} from "./helper/merchantapicall"
import { API } from "../backend"

export default function AMerchantDashboard() {

    const {merchant, token} = misAuthenticated();

    const [m, setM] = useState("")

    const [qrurl, setQrurl] = useState("")

    const preload = () => {
        getmerchant(merchant._id,token).then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                setM(data)
                setQrurl(`http://localhost:3000/menu/${merchant._id}`)
            }
        })

    }

    useEffect(() => {
        preload();
    }, [] )



    // Download QR Code for the merchant
    const downloadQR = () => {

        // Create QR Code
        createQR(merchant._id,token,{qrurl}).then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                // Write Here
            }
        })
        /*
        // Download QR Code
        downloadQRCode(merchant._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                // Write Here
            }
        })
        */
    }

    const merchantLeftSide = () => {
        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">
                Restaurant Navigation
                </h4>

                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/merchant/create/foodItem" className="nav-link text-success">
                            Add Food Item
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/merchant/foodItems" className="nav-link text-success">
                            Manage Menu
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/merchant/orders" className="nav-link text-success">
                            Manage Orders
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/merchant/update/merchant" className="nav-link text-success">
                            Manage Restaurant Account
                        </Link>
                    </li>
                    
                </ul>
            </div>
        )
    };

    const merchantRightSide = () => {
      return(
        <div className="card mb-4">
            <h4 className="card-header">Restaurant Info</h4>
        <ul className="list-group">
            <li className="list-group-item">
                <span className="badge badge-success mr-2">
                    Username:
                </span> {m.username}
            </li>
            <li className="list-group-item">
                <span className="badge badge-success mr-2">
                    Restaurant Name:
                </span> {m.merchantName}
            </li>
            <li className="list-group-item">
                <span className="badge badge-success mr-2">
                    Owner Name:
                </span> {m.ownerName}
            </li>
            <li className="list-group-item">
                <span className="badge badge-danger mr-2">
                    Restaurant Privileges Granted Successfully
                </span> 
            </li>
            <li className="list-group-item">
                <button onClick={() => {
                    downloadQR()
                  }} className="btn btn-info text-white mr-2 p-1">
                    Download QR-Code
        </button>
            </li>
        </ul>
        </div>
      )  
    };

    return (
        <Base 
        title="Welcome to Restaurant Dashboard" 
        description="Manage your Menu"
        className="container bg-success p-4"
        >
            <div className="row">
                <div className="col-3">
                        {merchantLeftSide()}
                </div>

                <div className="col-9">
                        {merchantRightSide()}                    
                </div>
            </div>

        </Base>
    )
}
