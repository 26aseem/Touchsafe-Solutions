
import React, {useState, useEffect} from 'react'
import { Redirect } from "react-router-dom";
import ImageHelper from './helper/ImageHelper';
import {addItemToCart, removeItemFromCart ,incrementItemFromCart,decrementItemFromCart} from "./helper/cartHelper"

const CardCart = ({
  food,
  addtoCart = true,
  removeFromCart = false,
  setReload = f => f,
  // function(f){return f}
  reload = undefined
}) => {

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(food.count);

  const cartTitle = food ? food.dishName : "My Fav Dish";
  const cartDescription = food ? food.dishDesc : "All About your Fav Dish";
  const cartPrice = food ? food.dishPrice : 0;
  const cartCount = food ? food.count : 1;
  const cartAmount = food ? food.dishPrice*food.count : food.dishPrice;

  const addToCart = () => {
    addItemToCart(food, () => setRedirect(true));
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
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

  const decrementItemCart = () => {
    return(
      (
      <button onClick={() => {
        decrementItemFromCart(food._id);
        setReload(!reload);
        
      }}
      className="btn btn-info rounded ml-3 mb-2 "
      >
        –
      </button>
      )
    ) 
  }

  const incrementItemCart = () => {
    return(
        (
      <button onClick={() => {
        incrementItemFromCart(food._id);
        setReload(!reload);
        
      }}
      className="btn btn-info rounded mb-2 "
      >
        +
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
              <p className="btn btn-success rounded  btn-sm px-4">Price: ₹ {cartPrice} </p>
              <br/>
              {incrementItemCart()}
               {decrementItemCart()}
               <br/>
              <p className="btn btn-success rounded  btn-sm px-4">Quantity: {cartCount} </p>
              <br/>
              <p className="btn btn-success rounded  btn-sm px-4">Amount: ₹ {cartAmount} </p>
              
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
    
export default CardCart;
