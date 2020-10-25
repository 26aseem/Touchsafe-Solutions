import React from 'react'
import Base from "../core/Base"
import { isAuthenticated } from "../auth/helper/adminIndex"
import {Link} from 'react-router-dom'

export default function AdminDashboard() {

    const {admin: {username}} = isAuthenticated();

    const adminLeftSide = () => {
        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">
                    Admin Navigation
                </h4>

                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-success">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/categories" className="nav-link text-success">
                            Manage Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/merchant" className="nav-link text-success">
                            Add Restaurant
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/merchants" className="nav-link text-success">
                            Manage Restaurants
                        </Link>
                    </li>
                    
                </ul>
            </div>
        )
    };

    const adminRightSide = () => {
      return(
        <div className="card mb-4">
            <h4 className="card-header">Admin Info</h4>
        <ul className="list-group">
            <li className="list-group-item">
                <span className="badge badge-success mr-2">
                    Username:
                </span> {username}
            </li>
            <li className="list-group-item">
                <span className="badge badge-danger mr-2">
                    Admin Area
                </span> 
            </li>
        </ul>
        </div>
      )  
    };

    return (
        <Base 
        title="Welcome to Admin Dashboard" 
        description="Manage all the Restaurants Here"
        className="container bg-success p-4"
        >
            <div className="row">
                <div className="col-3">
                        {adminLeftSide()}
                </div>

                <div className="col-9">
                        {adminRightSide()}                    
                </div>
            </div>

        </Base>
    )
}
