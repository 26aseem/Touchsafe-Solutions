import { API } from "../../backend";

export const createorder = (merchantId,orderData) => {
return fetch(`${API}/order/create/${merchantId}`,{   
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({order:orderData})
})
.then(response => {
    return response.json();
})
.catch(err => console.log(err));
};

