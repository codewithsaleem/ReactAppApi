import React, { Component } from "react";
import http from "./httpServiceRouter.js";

class CarNodeAddForm extends Component {
    state = {
        cars: [],
        car: { id: "", price: "", kms: "", year: "", model: "", color: "" },
        models: ["Swift Dzire VXi", "Etios SMi", "City AXi", "Swift DXi", "Etios VXi", "City ZXi"],
        colors: ["White", "Black", "Red", "Stil Grey", "Silver Grey", "Metallic Blue"],
        edit: false,
    }

    handleChange = (e) => {
        let s1 = { ...this.state };
        let { currentTarget: input } = e;
        s1.car[input.name] = input.value;
        this.setState(s1);
    }

    async fetchData() {
        let { id } = this.props.match.params;

        if (id) {
            let response = await http.get(`/cars/${id}`);
            let { data } = response;
            this.setState({ car: data, edit: true });
        } else {
            let car = { id: "", price: "", kms: "", year: "", model: "", color: "" };
            this.setState({ car: car, edit: false });
        }
    }

    async componentDidMount() {
        this.fetchData();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
    }

    handleSubmit = (e) => {
        let { car, edit } = this.state;
        edit === true ? this.putData(`/cars/${car.id}`, car)
            : this.postData("/cars", car);
    }

    async postData(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        this.props.history.push("/cars");
    }

    async putData(url, obj) {
        let response = await http.put(url, obj);
        let { data } = response;
        this.props.history.push("/cars");
    }

    render() {
        let { cars, models, colors } = this.state;
        let { id, price, kms, year, model, color } = this.state.car;

        let uniqueModel = cars.reduce((acc, curr) => {
            if (!acc.includes(curr.model)) {
                acc.push(curr.model);
            }
            return acc;
        }, []);

        let uniqueColor = cars.reduce((acc, curr) => {
            if (!acc.includes(curr.color)) {
                acc.push(curr.color);
            }
            return acc;
        }, []);

        return (
            <div className="container">
                <h2 className="text-center">Car Details</h2>

                <div className="form-group">
                    <label className="form-group-label"><b>Car Id</b></label>
                    <input
                        className="form-control"
                        type="text"
                        id="id"
                        name="id"
                        value={id}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-group-label"><b>Price</b></label>
                    <input
                        className="form-control"
                        type="text"
                        id="price"
                        name="price"
                        value={price}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-group-label"><b>Mileage in kms</b></label>
                    <input
                        className="form-control"
                        type="text"
                        id="kms"
                        name="kms"
                        value={kms}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-group-label"><b>Year of Manufature</b></label>
                    <input
                        className="form-control"
                        type="text"
                        id="year"
                        name="year"
                        value={year}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="row">
                    <div className="col-6">
                        <label className="form-group-label"><b>Model</b></label>
                        <select className="form-control" name="model" id="model" value={model} onChange={this.handleChange}>
                            <option value="">Select Model</option>
                            {models.map((ele, index) => (
                                <option key={ele} value={ele}>{ele}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-6">
                        <label className="form-group-label"><b>Color</b></label>
                        <select className="form-control" name="color" id="color" value={color} onChange={this.handleChange}>
                            <option value="">Select Color</option>
                            {colors.map((ele, index) => (
                                <option key={ele} value={ele}>{ele}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="text-center">
                    <button className="btn btn-primary mt-3" onClick={this.handleSubmit}>Submit</button>
                </div>

            </div>
        )
    }
}
export default CarNodeAddForm;