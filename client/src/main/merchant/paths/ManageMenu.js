import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import {Link} from "react-router-dom"
import { misAuthenticated } from '../../auth/helper/merchantIndex';
import { getfoods, deletefood } from '../helper/merchantapicall';

export default function ManageMenu() {

    const [foods, setfoods] =useState([]);

    const {merchant, token} = misAuthenticated();
   
    const preload = () => {
        getfoods(merchant._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                setfoods(data);
                console.log(data)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const deleteThisFood = (foodId) => {
      deletefood(foodId,merchant._id,token)
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
        <Base title="Welcome Team" description="Manage Menu here">
        <Link className="btn btn-info" to={`/merchant/dashboard`}>
        <span className="">Restaurant Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-success my-3 mt-5 mb-5">Food Items</h2>

            {foods.map((food, index) => (
              
                <div key={index} className="row text-center mb-2 ml-3 ">
                
                  <div className="col-1">
                    <Link
                      className="btn btn-success"
                      to={`/merchant/update/food/${food._id}`}
                    >
                    <span className="">
                      Update Food
                      </span>
                    </Link>
                  </div>
                
                <div className="col-1">
                  <button onClick={() => {
                      deleteThisFood(food._id)
                  }} className="btn btn-danger">
                    Delete Food 
                  </button>
                </div>
              
                <div className="col-7 offset-1">
                    <h3 className="text-white text-left">{food.dishName}</h3>
                </div>

              </div>
           
            ))
                }
          
        </div>
      </div>
    </Base>
    )
}
