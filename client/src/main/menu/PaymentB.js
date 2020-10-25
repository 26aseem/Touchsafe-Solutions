import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { getmeToken, processPayment } from "./helper/paymentBHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper/adminIndex";

import DropIn from "braintree-web-drop-in-react"


const PaymentB = ({products, setReload = f => f, reload = undefined}) => {
    
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "", 
        instance: {}
    });

    const { user, token } = isAuthenticated();
        
    const getToken = (userId, token) => {
    getmeToken(userId, token).then(info => {
        console.log(info)
        if (info.error) {
            setInfo({ ...info, error: info.error });
          } else {
            const clientToken = info.clientToken;
            setInfo({ clientToken });
          }
        })        
    };

    const showDropIn = () => {
        return (
            <div>
              {info.clientToken !== null && products.length > 0 ? (
                <div>
                  <DropIn
                    options={{ authorization: info.clientToken }}
                    onInstance={instance => (info.instance = instance)}
                  />
                  <button className="btn btn-block btn-success" onClick={onPurchase}>
                    Buy
                  </button>
                </div>
              )
                  :(<h3>Please Login to Checkout or Add items to your Cart</h3>)
                }
            </div>
        )
    }


    useEffect(() => {
        getToken(user._id, token);
    }, []);
    
    const onPurchase = () => {
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount()
                };
                processPayment(user._id, token, paymentData)
                .then(response => {
                    setInfo({...info, success: response.success,loading: false})
                    console.log("PAYMENT SUCCESSFUL");
                    const orderData = {
                        products: products,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount,
                        status: "Received",
                        user: user._id,
                        updated: new Date().getTime()
                    };
                    createOrder(user._id, token, orderData)
                    .then(response => {
                        if(response.error){
                            console.log("Error in Order Creation");
                        } else{
                            console.log("Order Created Successfully");
                        }
                    
                    })
                    cartEmpty(() => {

                    })
                    setReload(!reload);
                })
                .catch(error => {
                    setInfo({loading: false, success:false})
                    console.log("PAYMENT FAILED");
                })
            })
    }


    const getAmount = () => {
        let amount = 0
        products.map(product => {
            amount = amount + product.price
        })
        return amount
    }

    
    return (
        <div>
            <h3>Checkout Here Folks!</h3>
            <h3 className="text-warning">Your total Amount = {getAmount()}</h3>
            {showDropIn()}
        </div>
    )
}

export default PaymentB;