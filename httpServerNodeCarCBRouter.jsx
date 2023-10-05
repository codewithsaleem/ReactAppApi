import React, { Component } from "react";

class CarNodeCheckboxes extends Component {
    handleChange = (e) => {
        const { currentTarget: input } = e;
        const { options } = this.props;
        options[input.name] = input.value;
        this.props.onOptionChange(options);
    }

    render() {
        const { options } = this.props;

        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12 border"><b>Fuel</b></div>
                    <div className="col-12 border">
                        <input
                            type="radio"
                            name="fuel"
                            value="Diesel"
                            checked={options.fuel === "Diesel"}
                            onChange={this.handleChange}
                        />
                        <label className="ms-2">Diesel</label>
                    </div>
                    <div className="col-12 border">
                        <input
                            type="radio"
                            name="fuel"
                            value="Petrol"
                            checked={options.fuel === "Petrol"}
                            onChange={this.handleChange}
                        />
                        <label className="ms-2">Petrol</label>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12 border"><b>Type</b></div>
                    <div className="col-12 border">
                        <input
                            type="radio"
                            name="type"
                            value="Hatchback"
                            checked={options.type === "Hatchback"}
                            onChange={this.handleChange}
                        />
                        <label className="ms-2">Hatchback</label>
                    </div>
                    <div className="col-12 border">
                        <input
                            type="radio"
                            name="type"
                            value="Sedan"
                            checked={options.type === "Sedan"}
                            onChange={this.handleChange}
                        />
                        <label className="ms-2">Sedan</label>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12 border"><b>Sort</b></div>
                    <div className="col-12 border">
                        <input
                            type="radio"
                            name="sort"
                            value="kms"
                            checked={options.sort === "kms"}
                            onChange={this.handleChange}
                        />
                        <label className="ms-2">kms</label>
                    </div>
                    <div className="col-12 border">
                        <input
                            type="radio"
                            name="sort"
                            value="price"
                            checked={options.sort === "price"}
                            onChange={this.handleChange}
                        />
                        <label className="ms-2">Price</label>
                    </div>
                    <div className="col-12 border">
                        <input
                            type="radio"
                            name="sort"
                            value="year"
                            checked={options.sort === "year"}
                            onChange={this.handleChange}
                        />
                        <label className="ms-2">Year</label>
                    </div>
                </div>
            </div>
        )
    }
}
export default CarNodeCheckboxes;
