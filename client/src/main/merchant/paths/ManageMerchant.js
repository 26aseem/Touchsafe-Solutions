import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import {Link, Redirect} from "react-router-dom"
import { misAuthenticated, msignout } from '../../auth/helper/merchantIndex';
import { getmerchant, deletemerchant, updatemerchant } from '../../merchant/helper/merchantapicall';
export default function ManageMerchant() {

    const [merchants, setmerchants] =useState([]);

    const {merchant, token} = misAuthenticated();

    const preload = () => {
        getmerchant(merchant._id,token).then(data => {
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
              console.log("Deletion is successful")
              
            }
        })
      }



    return (
        <Base title="Welcome Restaurant" description="Manage Restaurant Account here">
        <Link className="btn btn-info" to={`/merchant/dashboard`}>
        <span className="">Restaurant Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-success my-3 mt-5 mb-5">Restaurant</h2>

                <div className="row text-center mb-2 ml-3 ">
                
                  <div className="col-1">
                    <Link
                      className="btn btn-success"
                      to={`/admin/merchant/update/merchantId`}
                    >
                    <span className="">Update</span>
                    </Link>
                  </div>
                
                <div className="col-1">
                  <button onClick={() => {
                      deleteThisMerchant(merchants._id)
                  }} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              
                <div className="col-7 offset-1">
                    <h3 className="text-white text-left">{merchants.merchantName}</h3>
                </div>

              </div>
           
            
                
          
        </div>
      </div>

            
    </Base>
    )
}
