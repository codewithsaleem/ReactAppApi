import React, { Component } from "react";
import http from "./httpServiceNode.js";

class AddFormNode extends Component {
    state = {
        customers: { id: "", name: "", city: "", age: "", gender: "", payment: "" },
        genders: ["Male", "Female"],
        cities: ["Delhi", "Noida", "Gurgaon", "Jaipur"],
        payments: ["Credit Card", "Debit Card", "Wallet"],
        edit: false,
    }

    handleChange = (e) => {
        let s1 = { ...this.state };
        let { currentTarget: input } = e;
        s1.customers[input.name] = input.value;
        this.setState(s1);
    }

    async fetchData() {
        let { id } = this.props.match.params;

        if (id) {
            let response = await http.get(`/customers/${id}`);
            let { data } = response;
            console.log("Jamal", response)
            this.setState({ customers: data, edit: true })
        } else {
            let customer = { id: "", name: "", city: "", age: "", gender: "", payment: "" };
            this.setState({ customers: customer, edit: false })
        }
    }

    async componentDidMount() {
        this.fetchData();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
    }

    handleSubmit = (e) => {
        let { customers, edit } = this.state;
        edit === true ? this.putData(`/customers/${customers.id}`, customers)
            : this.postData("/customers", customers);
    }

    async putData(url, obj) {
        let response = await http.put(url, obj);
        let { data } = response;
        this.props.history.push("/customers");
    }

    async postData(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        this.props.history.push("/customers");
    }

    makeInput = (name, label) => {
        return (
            <div className="form-group" key={name}>
                <label className="form-group-label"><b>{label}</b></label>
                <input
                    className="form-control"
                    type="text"
                    id={name}
                    name={name}
                    value={this.state.customers[name]}
                    onChange={this.handleChange}
                />
            </div>
        )
    }

    makeDD = (arr, label, city) => {
        return (
            <div className="form-group" key={city}>
                <label className="form-group-label"><b>{label}</b></label>
                <select
                    className="form-control"
                    name={city}
                    value={this.state.customers[city]}
                    onChange={this.handleChange}
                >
                    <option value="">{label}</option>
                    {arr.map((ele, index) => (
                        <option key={index} value={ele}>{ele}</option>
                    ))}
                </select>
            </div>
        )
    }

    makeRadio = (arr, name) => {
        return (
            <div className="form-group-check" key={name}>
                <label className="form-group-label"><b>{name}</b></label> <br />
                {arr.map((ele, index) => (
                    <React.Fragment key={index}>
                        <input
                            className="ms-2"
                            type="radio"
                            name={name}
                            value={ele}
                            checked={this.state.customers[name] === ele}
                            onChange={this.handleChange}
                        />
                        <label className="form-check-label ms-2">{ele}</label>
                    </React.Fragment>
                ))}
            </div>
        )
    }

    render() {
        const { cities, genders, payments } = this.state;

        return (
            <div className="container">
                {this.makeInput("id", "ID")}
                {this.makeInput("name", "Name")}
                {this.makeDD(cities, "Select City", "city")}
                {this.makeInput("age", "Age")}
                {this.makeRadio(genders, "gender")}
                {this.makeRadio(payments, "payment")}
                <button className="btn btn-primary mt-2" onClick={() => this.handleSubmit()}>Submit</button>
            </div>
        )
    }
}

export default AddFormNode;