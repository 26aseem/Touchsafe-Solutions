import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./core/Home"
import Cart from "./menu/Cart"
import AdminRoute from "./auth/helper/AdminRoute"
import MerchantRoute from "./auth/helper/MerchantRoute"
import AdminSignup from "./admin/AdminSignup"
import AdminSignin from "./admin/AdminSignin"
import MerchantSignup from "./merchant/MerchantSignup"
import MerchantSignin from "./merchant/MerchantSignin"

import AdminDashboard from "./admin/AdminDashBoard"
import AddCategory from "./admin/paths/AddCategory"
import ManageCategories from "./admin/paths/ManageCategories"
import AddMerchant from "./admin/paths/AddMerchant"
import ManageMerchants from "./admin/paths/ManageMerchants"

import MerchantDashboard from "./merchant/MerchantDashBoard"
import AddFood from "./merchant/paths/AddFood"
import ManageMenu from "./merchant/paths/ManageMenu"
import ManageRestaurant from "./merchant/paths/ManageRestaurant"
import ManageOrders from "./merchant/paths/ManageOrders"

// For Modification
import UpdateCategory from "./admin/paths/UpdateCategory"
import UpdateRestaurant from "./admin/paths/UpdateRestaurant"
import UpdateFood from "./merchant/paths/UpdateFood"

// For displaying menu
import DisplayMenu from "./menu/DisplayMenu"

// For Kitchen
import PendingOrders from "./merchant/paths/PendingOrders"

                

export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/adminsignup" component={AdminSignup}/>
                <Route path="/adminsignin" component={AdminSignin}/>
                <Route path="/restaurantSignup" component={MerchantSignup}/>
                <Route path="/restaurantSignin" component={MerchantSignin}/>
                
                <Route exact path="/cart/:restaurantId" component={Cart}/>
                <Route exact path="/menu/:restaurantId" component={DisplayMenu}/>   
                <Route exact path="/kitchen/:restaurantId" component={PendingOrders}/>   
                           
                
                <AdminRoute path="/admin/dashboard" component={AdminDashboard}/>
                <AdminRoute path="/admin/create/category" component={AddCategory}/>
                <AdminRoute path="/admin/categories" component={ManageCategories}/>
                <AdminRoute path="/admin/create/merchant" component={AddMerchant}/>
                <AdminRoute path="/admin/merchants" component={ManageMerchants}/>
                <AdminRoute exact path="/admin/update/category/:categoryId" component={UpdateCategory}/>
                <AdminRoute exact path="/admin/update/restaurant/:merchantId" component={UpdateRestaurant}/>


                <MerchantRoute path="/merchant/dashboard" component={MerchantDashboard}/>
                <MerchantRoute path="/merchant/create/foodItem" component={AddFood}/>
                <MerchantRoute path="/merchant/foodItems" component={ManageMenu}/>
                <MerchantRoute path="/merchant/update/merchant" component={ManageRestaurant}/>
                <MerchantRoute path="/merchant/orders" component={ManageOrders}/>
                <MerchantRoute exact path="/merchant/update/food/:foodId" component={UpdateFood}/>
               

            </Switch>
        </Router>
    );
}

