import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "./adminIndex";

const AdminRoute = ({ component: Component, ...rest }) =>  {
    return (
      <Route
        {...rest}
        render={props =>
         isAuthenticated() ? (
            <Component {...props} />
            ) : (
            <Redirect
              to={{
                pathname: "/adminsignin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default AdminRoute;