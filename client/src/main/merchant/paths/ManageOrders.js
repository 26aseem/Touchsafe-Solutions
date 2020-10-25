import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import {Link} from "react-router-dom"
import { misAuthenticated } from '../../auth/helper/merchantIndex';
import { getorders, acceptOrder,cancelOrder,alterpaystatus,generateReport } from '../helper/merchantapicall';
import CsvDownload from 'react-json-to-csv'


export default function ManageOrders() {

    const [orders, setorders] =useState([]);
    const [reports, setreports] =useState([]);

    const [s,sets] = useState(false)

    let status = ""
    const {merchant, token} = misAuthenticated();
   
    const preload = () => {
        getorders(merchant._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                setorders(data);
                if(s){
                sets(false)
                }
              }
        })


    }

    useEffect(() => {
        preload()
    }, [])

    const acceptThisOrder = (orderId) => {
      status = "Accepted"
      acceptOrder(orderId,merchant._id,token,{status})
        .then(data=> {
            if(data.error){
                console.log(data.error)
            }
            else{
                preload();
            }
        })
        status = ""
    }

    const cancelThisOrder = (orderId) => {
      status = "Cancelled"
        cancelOrder(orderId,merchant._id,token,{status})
          .then(data=> {
              if(data.error){
                  console.log(data.error)
              }
              else{
                  preload();
              }
          })
          status = ""
      }

      const alterPay = (orderId,paystatus) => {
        let paymentStatus = paystatus === "Pending" ? "Completed" : "Pending"
          alterpaystatus(orderId,merchant._id,token,{paymentStatus})
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
        cancelOrder(orderId,merchant._id,token)
          .then(data=> {
              if(data.error){
                  console.log(data.error)
              }
              else{
                  preload();
              }
          })
      }

      const generateMyReport = () => {
        getorders(merchant._id, token).then(data => {
          if(data.error) {
              console.log(data.error);
          }else{
              setreports(data);
              preload()
            }
          })

        }

        const showreport = (s) => {
          return(
            !s ? (
              <button onClick={() => {
                generateMyReport()
                sets(true)
                      }} className="btn btn-success text-white float-right">
                        Generate Report 
            </button>
            )
            :
            (
            
              <CsvDownload data={reports} filename="Restaurant Report.csv"  className="btn btn-success text-white float-right"/>
            
            )
          )
          
        }



    return (
        <Base title="Welcome Management Team" description="Manage Orders here">
        <Link className="btn btn-info" to={`/merchant/dashboard`}>
        <span className="">Restaurant Home</span>
        </Link>
        {showreport(s)}

      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-success my-3 mt-5 mb-5">ORDERS</h2>

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

                  <li className="list-group-item">
                    <span className="badge badge-success mr-2 ml-1">
                      Payment Status:
                  </span><span className="text-primary"> {order.paymentStatus}</span>
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
                    acceptThisOrder(order._id)
                  }} className="btn btn-success rounded">
                    Accept Order 
                  </button>
                </div>
                
                <div className="col-2">
                  <button onClick={() => {
                      cancelThisOrder(order._id)
                  }} className="btn btn-danger rounded">
                    Cancel Order 
                  </button>
                </div>
              
                <div className="col-2">
                  <button onClick={() => {
                      alterPay(order._id, order.paymentStatus)
                  }} className="btn btn-info rounded">
                    Alter Payment Status 
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
