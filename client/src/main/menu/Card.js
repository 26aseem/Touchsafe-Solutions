
import React, {useState, useEffect} from 'react'
import { Redirect } from "react-router-dom";
import {useParams} from "react-router-dom"
import ImageHelper from './helper/ImageHelper';
import {addItemToCart, removeItemFromCart } from "./helper/cartHelper"

const Card = ({
  food,
  addtoCart = true,
  removeFromCart = false,
  setReload = f => f,
  // function(f){return f}
  reload = undefined
}) => {

  const {restaurantId} = useParams()

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(food.count);

  const cartTitle = food ? food.dishName : "My Fav Dish";
  const cartDescription = food ? food.dishDesc : "All About your Fav Dish";
  const cartPrice = food ? food.dishPrice : 0;

  const addToCart = () => {
    addItemToCart(food, () => setRedirect(true));
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to={`/cart/${restaurantId}`} />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return(
      addtoCart && (
      <button
      onClick={addToCart}
      className="btn btn-block btn-outline-success mt-2 mb-2"
    >
      Add to Cart
    </button>
    )
  )

  }

  const showRemoveToCart = (removeFromCart) => {
    return(
      removeFromCart && (
      <button onClick={() => {
        removeItemFromCart(food._id);
        setReload(!reload);
        
      }}
      className="btn btn-block btn-outline-danger mt-2 mb-2"
      >
        Remove from cart
      </button>
      )
    )
    
  }


        return (
          <div className="card text-white bg-dark border border-info mx-4">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
              <ImageHelper product={food} />
              <p className="lead bg-success font-weight-normal text-wrap">
                {cartDescription}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">₹ {cartPrice} </p>
              <div className="row">
                <div className="col-12">
                  {showAddToCart(addtoCart)}
                </div>
                <div className="col-12">
                  {showRemoveToCart(removeFromCart)}
                </div>
              </div>
            </div>
            {getARedirect(redirect)}
          </div>
        );
      };
    
export default Card;
