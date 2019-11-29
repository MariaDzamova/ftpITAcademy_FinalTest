import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
class RatingForm extends Component {
  render() {
    return (
      <form>
        <div className="radio" onChange={this.setValue.bind(this)}>
          <label>
            <input type="radio" name="rating" value="1" />1
          </label>

          <label>
            <input type="radio" name="rating" value="2" />2
          </label>

          <label>
            <input type="radio" name="rating" value="3" />3
          </label>

          <label>
            <input type="radio" name="rating" value="4" />4
          </label>

          <label>
            <input type="radio" name="rating" value="5" />5
          </label>
        </div>

        <button
          className="btn btn-primary"
          type="button"
          onClick={this.submitRateHandler}
        >
          Submit
        </button>

        <button
          className="btn btn-secondary"
          type="button"
          onClick={this.cancelRateHandler}
        >
          Cancel
        </button>
      </form>
    );
  }

  setValue(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  routeToGame() {
    const { history } = this.props;
    history.goBack();
  }

  submitRateHandler = event => {
    fetch("http://localhost:3300/api/rating", {
      method: "POST",
      body: JSON.stringify({
        value: this.state.value
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => this.routeToGame());
  };

  cancelRateHandler = () => {
    this.routeToGame();
  };
}
export default withRouter(RatingForm);
