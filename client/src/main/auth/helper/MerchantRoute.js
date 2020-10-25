import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {misAuthenticated} from "./merchantIndex";

const MerchantRoute = ({ component: Component, ...rest }) =>  {
    return (
      <Route
        {...rest}
        render={props =>
         misAuthenticated() ? (
            <Component {...props} />
            ) : (
            <Redirect
              to={{
                pathname: "/restaurantSignin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default MerchantRoute;