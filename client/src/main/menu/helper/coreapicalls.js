import { API } from "../../backend";

export const getMenu = (restaurantID) => {
    return fetch (`${API}menu/${restaurantID}`,
    {method: "GET"}
    )
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
