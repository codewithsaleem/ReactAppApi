import React, { Component } from "react";
import http from "./httpServiceNode.js";

class CustomNodeTable extends Component {
    state = {
        cutomers: [],
    }

    async fetchData() {
        let response = await http.get("/customers");
        console.log("Sam",response)
        let { data } = response;
        let s1 = { ...this.state };
        s1.cutomers = data;
        this.setState(s1);
    }

    componentDidMount() {
        this.fetchData();
    }

    handleDelete = (index) => {
        let s1 = {...this.state};
        s1.cutomers.splice(index, 1);
        this.setState(s1);
    }

    handleEdit = (index) => {
        let editId = this.state.cutomers[index];
        this.props.history.push(`/customers/${editId.id}/edit`);
    }

    render() {
        let { cutomers } = this.state;
        return (
            <div className="container mt-2">
                <div className="row border bg-primary text-white">
                    <div className="col-1">ID</div>
                    <div className="col-2">Name</div>
                    <div className="col-2">City</div>
                    <div className="col-1">Age</div>
                    <div className="col-2">Gender</div>
                    <div className="col-2">Payment</div>
                    <div className="col-1 border"></div>
                    <div className="col-1 border"></div>
                </div>
                {cutomers.map((ele, index) => (
                    <div className="row" key={index}>
                        <div className="col-1 border">{ele.id}</div>
                        <div className="col-2 border">{ele.name}</div>
                        <div className="col-2 border">{ele.city}</div>
                        <div className="col-1 border">{ele.age}</div>
                        <div className="col-2 border">{ele.gender}</div>
                        <div className="col-2 border">{ele.payment}</div>
                        <div className="col-1 border"><button className="bg-warning m-1" onClick={() => this.handleEdit(index)}><i className="fa-solid fa-pen-to-square"></i></button></div>
                        <div className="col-1 border"><button className="bg-danger text-white m-1" onClick={() => this.handleDelete(index)}><i className="fa-solid fa-trash"></i></button></div>
                    </div>
                ))}
            </div>
        )
    }
}
export default CustomNodeTable;