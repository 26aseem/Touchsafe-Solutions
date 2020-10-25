//export default addItemToCart;

export const addItemToCart = (item, next) => {
  let cart = []
  if (typeof window !== undefined){
      if(localStorage.getItem("cart")){
          cart = JSON.parse(localStorage.getItem("cart"))
      }
      if(cart.length === 0){
          cart.push({
            ...item,
            count:1
          })
      }

      else{
        let flag = false
        cart.map((product, i) => {
          if (product._id === item._id) {
            product.count = product.count + 1
            flag = true
          }
          if (i === cart.length-1 && flag===false) {
            cart.push({
              ...item,
              count:1
            })
          }
        });  
      }

      localStorage.setItem("cart", JSON.stringify(cart))
  }
  next();
}


// Load the Order Cart
export const loadCart = () => {
    if (typeof window !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
};


// Delete the Item from the cart
export const removeItemFromCart = productId => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === productId) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
  };
  
  // Decrease the count of the Item from the cart
export const decrementItemFromCart = productId => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === productId && product.count>1) {
        product.count = product.count - 1
      }
      else if(product._id === productId && product.count===1){
        cart.splice(i, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

 // Increase the count of the Item from the cart
 export const incrementItemFromCart = productId => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === productId) {
        product.count = product.count + 1
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};
  
  
  // Empty cart
  export const cartEmpty = next => {
    if(typeof window !== undefined){
      localStorage.removeItem("cart");
      let cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  };