import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import CarNodeNav from "./httpServerNodeCarNavRouter";
import CarNodeTable from "./httpServerNodeCarTableRouter";
import CarNodeAddForm from "./httpServerNodeCarAddRouter";

class CarNodeMain extends Component {
    render() {
        return (
            <div className="container">
                <CarNodeNav />

                <Switch>
                    <Route path="/addNewCar" component={CarNodeAddForm} />
                    <Route path="/cars/:id/edit" component={CarNodeAddForm} />

                    <Route path="/cars" component={CarNodeTable} />
                    <Redirect from="/" to="/cars" />
                </Switch>
            </div>
        )
    }
}
export default CarNodeMain;