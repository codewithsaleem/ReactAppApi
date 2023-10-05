import React, { Component } from "react";
import http from "./httpServiceRouter.js";
import CarNodeCheckboxes from "./httpServerNodeCarCBRouter.jsx";
import queryString from "query-string";
import CarNodeInput from "./httpServerNodeCarInputRouter.jsx";

class CarNodeTable extends Component {
    state = {
        cars: [],
        minPrice: "",
        maxPrice: "",
    }

    async fetchData() {
        let queryParams = queryString.parse(this.props.location.search);
        let searchStr = this.makeSearchString(queryParams);

        let response = await http.get(`/cars?${searchStr}`);
        let { data } = response;
        let s1 = { ...this.state };
        s1.cars = data;
        this.setState(s1);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.search !== this.props.location.search) {
            this.fetchData();
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    makeSearchString = (options) => {
        let { fuel, type, sort, minPrice, maxPrice } = options;
        let searchStr = "";
        searchStr = this.addToQueryString(searchStr, "fuel", fuel);
        searchStr = this.addToQueryString(searchStr, "type", type);
        searchStr = this.addToQueryString(searchStr, "sort", sort);
        searchStr = this.addToQueryString(searchStr, "minPrice", minPrice);
        searchStr = this.addToQueryString(searchStr, "maxPrice", maxPrice);
        return searchStr;
    }

    addToQueryString = (str, paramName, paramValue) =>
        paramValue ? (str ? `${str}&${paramName}=${paramValue}` : `${paramName}=${paramValue}`) : str;

    handleDelete = (index) => {
        let s1 = { ...this.state };
        s1.cars.splice(index, 1);
        this.setState(s1);
    }

    handleEdit = (index) => {
        let editId = this.state.cars[index];
        this.props.history.push(`/cars/${editId.id}/edit`);
    }

    handleOptionChange = (options) => {
        this.callURL("/cars", options);
    }

    callURL = (url, options) => {
        let searchStr = this.makeSearchString(options);
        this.props.history.push({
            pathname: url,
            search: searchStr,
        })
    }

    render() {
        let { cars, minPrice, maxPrice } = this.state;
        let queryParams = queryString.parse(this.props.location.search);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <CarNodeCheckboxes options={queryParams} onOptionChange={this.handleOptionChange} />
                    </div>

                    <div className="col-9">
                        <CarNodeInput options={queryParams} onOptionChange={this.handleOptionChange} />

                        <div className="row text-center mt-3">
                            {cars.map((ele, index) => (
                                <div className="col-3 border bg-warning">
                                    <b>{ele.model}</b> <br />
                                    Price : {ele.price} <br />
                                    Color : {ele.color} <br />
                                    Mileage : {ele.kms} Kms <br />
                                    Manufactured in {ele.year} <br />

                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col-4">
                                            <i className="fa-solid fa-pen-to-square" onClick={() => this.handleEdit(index)}></i>
                                        </div>

                                        <div className="col-4">
                                            <i className="fa-solid fa-trash" onClick={() => this.handleDelete(index)}></i>
                                        </div>
                                        <div className="col-2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CarNodeTable;