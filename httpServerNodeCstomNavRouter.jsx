import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavNode extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <Link to="" className="navbar-brand ms-2">Customer Bar</Link>

                <div className="">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/customers" className="nav-link">Shows Customers</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/customersAdd" className="nav-link">New Customers</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default NavNode;