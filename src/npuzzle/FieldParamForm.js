import React, { Component } from "react";

export default class FieldParamForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = { rowCount: "4", colCount: "4" };
    this.state = this.initialState;
  }

  render() {
    const { rowCount, colCount } = this.state;
    const { submitHandler, cancelHandler } = this.props;

    return (
      <div>
        <form>
          <div className="form-group">
            <label>Number of rows:</label>

            <input
              className="form-control"
              type="number"
              name="rowsNumber"
              min="2"
              max="10"
              value={rowCount}
              onChange={this.handleRows}
            //   onChange={this.handleRows}
            />
          </div>

          <div className="form-group">
            <label>Number of columns:</label>

            <input
              className="form-control"
              type="number"
              name="colsNumber"
              min="2"
              max="10"
              value={colCount}
              onChange={this.handleCols}
            //   onChange={this.handleCols}
            />
          </div>

          <button
            className="btn btn-primary"
            type="button"
            onClick={() => submitHandler(this.state)}
          >
            Submit
          </button>

          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => this.resetHandler()}
          >
            Reset
          </button>

          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => cancelHandler()}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleCols = event => {
    this.setState({
      colCount: event.target.value
    });
  };

  handleRows = event => {
    this.setState({
      rowCount: event.target.value
    });
  };

  resetHandler = () => {
    this.setState(this.initialState);
  };
}
