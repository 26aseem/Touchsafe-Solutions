import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import {Link,useParams} from "react-router-dom"
import { getacceptedorders,processOrder} from '../helper/merchantapicall';

export default function PendingOrders() {

    const {restaurantId} = useParams()

    const [orders, setorders] =useState([]);

    let status = ""
    
    const preload = () => {
        getacceptedorders(restaurantId).then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                setorders(data);
                console.log(data)
              }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const processThisOrder = (orderId) => {
      status = "Processed"
      processOrder(orderId,restaurantId,{status})
        .then(data=> {
            if(data.error){
                console.log(data.error)
            }
            else{
                preload();
            }
        })
    }

      const viewThisOrder = (orderId) => {
        processOrder(orderId,restaurantId,{status})
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
        <Base title="Welcome Kitchen" description="Process Orders">
        <Link className="btn btn-info" to={`/merchant/dashboard`}>
        <span className="">Restaurant Home</span>
        </Link>

      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-success my-3 mt-5 mb-5">PENDING ORDERS</h2>

            {orders.map((order, index) => (
              
                <div key={index} className="row text-center mb-2 ml-3 ">
                
                
                <div className="col-3">
                <ul className="list-group">
                  <li className="list-group-item">
                    <span className="badge badge-success mr-2 ml-1">
                      Transaction Id:
                  </span><span className="text-primary"> {order.transaction_id}</span>
                  </li>
                
                  <li className="list-group-item">
                    <span className="badge badge-success mr-2 ml-1">
                      Status:
                  </span><span className="text-primary">{order.status}</span>
                  </li>

                </ul>
                </div>

                <div className="col-2">
                  <button onClick={() => {
                      viewThisOrder(order._id)
                  }} className="btn btn-info rounded">
                    View Order 
                  </button>
                </div>

                <div className="col-2">
                  <button onClick={() => {
                    processThisOrder(order._id)
                  }} className="btn btn-success rounded">
                    Process Order 
                  </button>
                </div>
            
              </div>
           
            ))
                }
          
        </div>
      </div>
    </Base>
    )
}
