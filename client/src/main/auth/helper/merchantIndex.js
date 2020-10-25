import {API} from "../../backend"
// API is basically path

// Backend for Signup
export const msignup = merchant => {
    return fetch(`${API}/merchantsignup`, {
        method: "POST",
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(merchant)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


// Backend for Signin
export const msignin = merchant => {
    return fetch(`${API}/merchantsignin`, {
        method: "POST",
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(merchant)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const mauthenticate = (data, next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}

// Backend for Signout
export const msignout = next => {
    if(typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        next();

        return fetch(`${API}/merchantsignout`, {
          method: "GET"  
        })
        .then(response => console.log("Signout Success"))
        .catch(err => console.log(err))
    }
    
};

export const misAuthenticated = () => {
    if(typeof window == "undefined") {
        return false
    }
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};