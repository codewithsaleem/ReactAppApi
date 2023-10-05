import React, { Component } from "react";
import { Link } from "react-router-dom";

class CarNodeNav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-danger bg-danger">
                <Link to="/" className="navbar-brand"></Link>

                <div className="">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/cars" className="nav-link text-white">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/addNewCar" className="nav-link text-white">New Car</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default CarNodeNav;