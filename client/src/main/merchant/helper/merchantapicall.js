import { API } from "../../backend"

// Foods
export const createfood = (merchantid, token, food) => {
    return fetch (`${API}/food/create/${merchantid}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
         Authorization: `Bearer ${token}`
       },
    body: food
    
    })
    .then(response => {
        console.log(response)
        return response.json();
    })
    .catch(err => console.log("bb"));
};
//export default createfood;


// get all foods
export const getfoods = (merchantId,token) => {
    return fetch(`${API}/foods/${merchantId}`,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response)
        return response.json();
        
    })
    .catch(err => console.log(err));
};



// delete a food
export const deletefood = (foodId, merchantId, token) => {
    return fetch(`${API}/food/${foodId}/${merchantId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
           Authorization: `Bearer ${token}`
         }
      
      })
      .then(response => {
          console.log(response)
        return response.json();
    })
    .catch(err => console.log(err));
}
  


// get a food
export const getfood = (foodId, merchantId,token) => {
    return fetch(`${API}/food/${foodId}/${merchantId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
           Authorization: `Bearer ${token}`
         }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


// update an food

export const updatefood = (foodId, token, merchantId, food) => {
    return fetch(`${API}/food/${foodId}/${merchantId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
           Authorization: `Bearer ${token}`
         },
      body: food
      
      })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
  };
  




// Merchant Call

// delete a merchant
export const deletemerchant = (merchantId,token) => {
    return fetch(`${API}/merchant/${merchantId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
           Authorization: `Bearer ${token}`
         }
      
      })
      .then(response => {
          console.log(response)
        return response.json();
    })
    .catch(err => console.log(err));
}
  


// get a merchant
export const getmerchant = (merchantId, token) => {
    return fetch(`${API}/merchant/${merchantId}`,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        
        return response.json();
    })
    .catch(err => console.log(err));
};

// get restaurant details
export const getmerchantdetail = (merchantId) => {
    return fetch(`${API}/merchantDetail/${merchantId}`,{
        method: "GET"
    })
    .then(response => {
        
        return response.json();
    })
    .catch(err => console.log(err));
};


// update a merchant

export const updatemerchant = (merchantId, token, merchant) => {
    return fetch(`${API}/merchant/${merchantId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
         },
      body:  merchant
      
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
  

  // Order APIs
  
// get all orders
export const getorders = (merchantId,token) => {
    return fetch(`${API}/allorders/${merchantId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
           Authorization: `Bearer ${token}`
         }
    })
    .then(response => {
        return response.json();
        
    })
    .catch(err => console.log(err));
};


// get all accepted and pending orders
export const getacceptedorders = (merchantId) => {
    return fetch(`${API}/allAcceptedOrders/${merchantId}`,{
        method: "GET",
        headers: {
            Accept: "application/json"
         }
    })
    .then(response => {
        return response.json();
        
    })
    .catch(err => console.log(err));
};

// accept the order
export const acceptOrder = (orderId,merchantId,token,order) => {
    return fetch(`${API}/order/${orderId}/updatestatus/${merchantId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    body: JSON.stringify(order)
    })
    .then(response => {
        console.log(response)
        return response.json();
        
    })
    .catch(err => console.log(err));
};

// cancel the order
export const cancelOrder = (orderId,merchantId,token,order) => {
    return fetch(`${API}/order/${orderId}/updatestatus/${merchantId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    body: JSON.stringify(order)
    })
    .then(response => {
        console.log(response)
        return response.json();
        
    })
    .catch(err => console.log(err));
};

// process the order
export const processOrder = (orderId,merchantId,order) => {
    return fetch(`${API}/order/${orderId}/updateacceptedstatus/${merchantId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    body: JSON.stringify(order)
    })
    .then(response => {
        console.log(response)
        return response.json();
        
    })
    .catch(err => console.log(err));
};


// alter payment status
export const alterpaystatus = (orderId,merchantId,token,order) => {
    return fetch(`${API}/order/${orderId}/updatepaystatus/${merchantId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    body: JSON.stringify(order)
    })
    .then(response => {
        console.log(response)
        return response.json();
        
    })
    .catch(err => console.log(err));
};


// Report
// get the report
export const generateReport = (merchantId,token) => {
    return fetch(`${API}/reports/${merchantId}`,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response)
        return response.json();
        
    })
    .catch(err => console.log(err));
};

// Download QR-Code for the restaurant

export const downloadQRCode = (merchantId,token) => {
    return fetch(`${API}/download/${merchantId}`,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
        
    })
    .catch(err => console.log(err));
};


// Create QR Code

export const createQR = (merchantId, token, merchant) => {
    return fetch(`${API}/merchantQR/${merchantId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
         },
      body:  JSON.stringify(merchant)
      
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};