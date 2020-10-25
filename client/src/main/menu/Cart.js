import React, {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import "../styles.css"
import Base from "../core/Base"
import CardCart from "./CardCart"
import { loadCart } from './helper/cartHelper';
import Order from './Order';



export default function Cart() {
    
    const {restaurantId} = useParams()

    const [foods, setFoods] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setFoods(loadCart());
    }, [reload])

    const loadAllFoods = () => (
        <div>
            <h2>
                
            </h2>
            {foods.map((food, index) => (
                <CardCart
                key={index}
                food={food}
                removeFromCart={true}
                addtoCart={false}
                setReload={setReload}
                reload={reload}
                />
            ))}
        </div>
    );
    
    const loadCheckout = (products) => (
        <div>
            <h2>
                This section is for checkout
            </h2>
        </div>
    );


    return (
        <Base title="Cart Page"
        description="Ready to Checkout"
        >
            <div className="row mb-5 col-3 ">
             <Link to={`/menu/${restaurantId}`} className="btn brn-md btn-danger mb-3 ml-3">
                            Return to Menu
              </Link>
            </div>

            <div className="row text-center">
              <div className="col-6">
                   {
                    foods && foods.length > 0 
                    ? loadAllFoods(foods) 
                    : 
                    (
                        <h3> No Food Item in your cart</h3>
                    )
                    } 
              </div>
              <div className="col-6"> <Order products={foods} setReload={setReload}/> </div>
            </div>
        </Base>
    )
}
