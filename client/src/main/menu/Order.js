import React, { useState, useEffect } from "react";
import { Link, useParams} from "react-router-dom";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { createorder } from "./helper/orderHelper";


const Order = ({products, setReload = f => f, reload = undefined}) => {
    
    const {restaurantId} = useParams()

    let c = []
        if (typeof window !== undefined){
            if(!localStorage.getItem("cart")){
                localStorage.setItem("cart",JSON.stringify(c))
            }
        }

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        error: ""
    });


    const showDropIn = () => {
        return (
            <div>
              {products.length > 0 ? (
                <div>
                  <button className="btn btn-block btn-success" onClick={onOrder}>
                    Confirm Order
                  </button>
                </div>
              )
                  :(<h3>Add items to your Cart</h3>)
                }
            </div>
        )
    }

    const showPaymentDropIn = () => {
        return (
            <div>
              {typeof window !== undefined && localStorage.getItem("payment") && localStorage.getItem("payment")>0
              ? (
                <div>  
                  <h3>Payment Here</h3>
                  <h3 className="text-info">Total Due Amount = {getDueAmount()+getAmount()}</h3>
                  <button className="btn btn-block btn-danger" onClick={onPayment}>
                    Payment
                  </button>
                </div>
              )
                  :(<h3/>)
                }
            </div>
        )
    }

    
    
    const onOrder = () => {
        setInfo({loading: true})
        const orderData = {
                        foods: products,
                        transaction_id: getTransactionID(),
                        amount: getAmount(),
                        status: "Received",
                        updated: new Date().getTime(),
                        rest: restaurantId
                    };
          
        createorder(restaurantId,orderData)
        .then(response => {
        if(response.error){
            console.log("Error in Order Creation");
        } 
        else{
            console.log("Order Created Successfully");
              }
            }
        )
   
        
        cartEmpty(() => {
            let payment = 0
            if (typeof window !== undefined){
                if(localStorage.getItem("payment")){
                    payment = JSON.parse(localStorage.getItem("payment"))
                }
            
                payment = payment + getAmount()
                localStorage.setItem("payment",payment)
            }
        })
        setReload(!reload);   
        setInfo({loading: false})
    }

    // Payment Function
    const onPayment = () => {
        if(typeof window !== undefined){
            localStorage.removeItem("payment");
        }
        setReload(!reload); 
        setInfo({loading: false})
    }

    // Calculate Total Amount
    const getAmount = () => {
        let amount = 0
        products.map(product => {
            amount = amount + product.dishPrice * product.count
        })
        return amount
    }

    // Create Transaction Id
    const getTransactionID = () => {
        let transactionID = 0
        products.map(product => {
            transactionID = transactionID + parseInt(product.dishPrice.toString() + product.count.toString() + (product.dishStock).toString() + (product.sold).toString()+ (product.dishPrice*product.count).toString())
        })
        return transactionID.toString()
    }
    
    // Calculate Due Total Amount
    const getDueAmount = () => {
        let amount = 0
        if (typeof window !== undefined){
            if(localStorage.getItem("payment")){
                amount = JSON.parse(localStorage.getItem("payment"))
            }
        }
        return amount
    }
    return (
    <div>
        <div>
            <h3>Checkout Here Folks!</h3>
            <h3 className="text-warning">Total Amount = {getAmount()}</h3>
            {showDropIn()}
        </div>

        <div>
            {showPaymentDropIn()}
        </div>
    </div>
    )
}

export default Order;