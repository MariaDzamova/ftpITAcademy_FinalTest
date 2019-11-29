import React, { Component } from "react";

export default class Ratings extends Component {
  state = {
    ratingData: []
  };

  componentDidMount() {
    fetch("http://localhost:3300/api/rating")
      .then(res => res.json())

      .then(data => {
        this.setState({
          ratingData: data
        });
        console.log(data);
      })
      .catch(console.log);
  }

  render() {
    return (
      <div>
        <p>
          Average game rating is:{" "}
          <ComputeAverageRate ratingData={this.state.ratingData} />
        </p>
      </div>
      // to see all ratings
      // <table className="table">
      //   <RatingTableBody ratingData={this.state.ratingData} />
      //   <ComputeAverageRate ratingData={this.state.ratingData} />
      // </table>
    );
  }
}

function ComputeAverageRate({ ratingData }) {
  let sum = 0;
  const dataArray = ratingData.map((rating, index) => rating.value);
  for (let i = 0; i < dataArray.length; i++) {
    sum += dataArray[i];
  }

  const average = (sum / dataArray.length).toFixed(2);

  return <h3>{average}</h3>;
}

function RatingTableBody({ ratingData }) {
  const rows = ratingData.map((rating, index) => (
    <tr key={index}>
      <td>{rating._id}</td>
      <td>{rating.value}</td>
    </tr>
  ));

  return <tbody>{rows}</tbody>;
}
