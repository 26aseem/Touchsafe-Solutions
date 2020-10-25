import React, {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import "../styles.css"
import Base from "../core/Base"
import Card from "./Card"
import { getMenu } from './helper/coreapicalls'
import {getmerchantdetail} from "../merchant/helper/merchantapicall"

export default function DisplayMenu() {
    
    const [foods, setFoods] = useState([]);
    const [error, setError] = useState(false);
    const [m,setM] = useState();

    const {restaurantId} = useParams()
        
    const loadAllMenu = (restaurantId) => {
      getMenu(restaurantId).then(data => {
        if(data.error){
          setError(data.error)
        } else{
          setFoods(data);
          }
      })
      getmerchantdetail(restaurantId).then(data => {
        if(data.error){
          setError(data.error)
        } else{
          setM(data.merchantName);
          }
      })

    }

    useEffect(() => {
      loadAllMenu(restaurantId)
    },[])


    return (
        <Base title={m} description="Menu">
          <div className="row mb-5 col-3 ">
             <Link to={`/cart/${restaurantId}`} className="btn brn-md btn-info mb-3 ml-3">
                            Process to Checkout
              </Link>
            </div>
            <div className="row text-center">
              <div className="row">
                {foods.map((food, index) => {
                  return(
                    <div key={index} className="col-4 mb-4">
                      <Card food={food}/>
                    </div>
                  )
                })}
              </div>
            </div>
        </Base>
    )
}
