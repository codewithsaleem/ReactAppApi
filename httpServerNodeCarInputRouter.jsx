import React, { Component } from "react";

class CarNodeInput extends Component {
    handleChange = (e) => {
        const { currentTarget: input } = e;
        const { options } = this.props;
        options[input.name] = input.value;
        this.props.onOptionChange(options);
    }

    render() {
        const { options } = this.props;

        return (
            <div className="row text-center">
                <h2>All Cars</h2>
                <div className="col-4"><b>Price Range : </b></div>
                <div className="col-4">
                    <input
                        className="form-control"
                        type="text"
                        name="minPrice"
                        id="minPrice"
                        placeholder="MinPrice"
                        value={options.price}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="col-4">
                    <input
                        className="form-control"
                        type="text"
                        name="maxPrice"
                        id="maxPrice"
                        placeholder="MaxPrice"
                        value={options.price}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }
}
export default CarNodeInput;