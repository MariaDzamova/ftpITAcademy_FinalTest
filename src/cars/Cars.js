import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";

class Cars extends Component {
  state = {
    carsData: []
  };

  componentDidMount() {
    fetch("http://localhost:3300/api/cars")
      .then(res => res.json())

      .then(data => {
        this.setState({
          carsData: data
        });
        console.log(data);
      })
      .catch(console.log);
  }

  render() {
    return (
      <div>
        <table className="table">
          <CarsTableHeader />
          <CarsTableBody carsData={this.state.carsData} />
        </table>
      </div>
    );
  }
}

function CarsTableHeader() {
  return (
    <thead>
      <tr>
        <th>Brand</th>
        <th>SPZ</th>
        <th>Action</th>
      </tr>
    </thead>
  );
}

function CarsTableBody({ carsData }) {
  const history = useHistory();
  function handleClick(car) {
    history.push("/cars/car-detail/" + car.brand);
  }

  const rows = carsData.map((car, index) => (
    <tr key={index} onClick={() => handleClick(car)}>
      <td>
        <Link to={"/cars/car-detail/" + car.brand}>{car.brand}</Link>
      </td>
      <td>{car.spz}</td>
      <td>
        <button
          className="btn btn-secondary"
          onClick={e => {
            e.stopPropagation();
            this.handleEdit(index);
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-secondary"
          onClick={e => {
            e.stopPropagation();
            this.handleDelete(index);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return <tbody>{rows}</tbody>;
}

export default withRouter(Cars);
