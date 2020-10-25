import { API } from "../../backend"

// Category
const createcategory = (adminid, token, category) => {
    return fetch (`${API}/category/create/${adminid}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
       },
    body: JSON.stringify(category)
    
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
export default createcategory;


// get all categories
export const getcategories = () => {
    return fetch(`${API}/categories`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};



// delete a category
export const deletecategory = (categoryId, adminId, token) => {
    return fetch(`${API}/category/${categoryId}/${adminId}`,{
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
  


// get a category
export const getcategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


// update a category

export const updatecategory = (categoryId, token, adminId, category) => {
    return fetch(`${API}/category/${categoryId}/${adminId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
         "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
         },
      body: JSON.stringify(category)
      
      })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
  };
  




// Merchant Call

// Add a Merchant
 export const createmerchant = (merchant) => {
    return fetch (`${API}/merchantsignup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
         //Authorization: `Bearer ${token}`
       },
    body: merchant
    
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

// get all merchants
export const getmerchants = () => {
    return fetch(`${API}/merchants`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

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
export const getmerchant = (merchantId) => {
    return fetch(`${API}/merchantDetail/${merchantId}`,{
        method: "GET",
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


// update a merchant

export const updatemerchant = (merchantId, merchant) => {
    return fetch(`${API}/merchantDetail/${merchantId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json"
         },
      body: merchant
      
      })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
  };
  