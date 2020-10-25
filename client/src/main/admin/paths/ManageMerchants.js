import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import {Link} from "react-router-dom"
import { isAuthenticated } from '../../auth/helper/adminIndex';
import { getmerchants, deletemerchant } from '../helper/adminapicall';
export default function ManageMerchants() {

    const [merchants, setmerchants] =useState([]);

    const {admin, token} = isAuthenticated();
   
    const preload = () => {
        getmerchants().then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                setmerchants(data);
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const deleteThisMerchant = (merchantId) => {
      deletemerchant(merchantId,token)
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
        <Base title="Welcome Admin" description="Manage Restaurants here">
        <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-success my-3 mt-5 mb-5">Restaurants</h2>

            {merchants.map((merchant, index) => (
              
                <div key={index} className="row text-center mb-2 ml-3 ">
                
                  <div className="col-1">
                    <Link
                      className="btn btn-success"
                      to={`/admin/update/restaurant/${merchant._id}`}
                    >
                    <span className="">Update</span>
                    </Link>
                  </div>
                
                <div className="col-1">
                  <button onClick={() => {
                      deleteThisMerchant(merchant._id)
                  }} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              
                <div className="col-7 offset-1">
                    <h3 className="text-white text-left">{merchant.merchantName}</h3>
                </div>

              </div>
           
            ))
                }
          
        </div>
      </div>
    </Base>
    )
}
