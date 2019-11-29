import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

class FormNew extends Component {
  constructor(props) {
    super(props);

    this.initialState = { brand: "", spz: "" };

    this.state = this.initialState;
  }

  render() {
    const { brand, spz } = this.state;

    // const { submitHandler, cancelHandler } = this.props;

    return (
      <div>
        <form>
          <div className="form-group">
            <label>Brand:</label>

            <input
              className="form-control"
              type="text"
              name="brand"
              value={brand}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>SPZ:</label>

            <input
              className="form-control"
              type="text"
              name="spz"
              value={spz}
              onChange={this.handleChange}
            />
          </div>

          <button
            className="btn btn-primary"
            type="button"
            onClick={() => this.submitHandler(this.state)}
          >
            Submit
          </button>

          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => this.cancelHandler()}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }

  handleChange = event => {
    // console.log(event.target);
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  cancelHandler = () => {
    this.routeToCars();
  };

  submitHandler = car => {
    fetch("http://localhost:3300/api/cars", {
      method: "POST",
      body: JSON.stringify({
        brand: car.brand,
        spz: car.spz
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => this.routeToCars());
  };

  routeToCars() {
    const { history } = this.props;
    history.goBack();
  }
}

export default withRouter(FormNew);
