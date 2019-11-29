import React, { Component } from "react";

const ScoreHeader = () => {
  return (
    <thead style={{ fontWeight: "bold" }}>
      <tr>
        <th scope="col">Points</th>
        <th scope="col">Player</th>
        <th scope="col">Date</th>
      </tr>
    </thead>
  );
};

const ScoreBody = ({ scoreData }) => {
  const rows = scoreData.map((score, index) => (
    <tr className="character-table-row" key={index}>
      <td>{score.points}</td>
      <td>{score.player}</td>
      <td>{score.date}</td>
    </tr>
  ));

  return <tbody>{rows}</tbody>;
};

export default class Score extends Component {
  state = { scores: [] };

  componentDidMount() {
    console.log("UPDATING");

    fetch("http://localhost:3300/api/scores")
      .then(res => res.json())

      .then(data => {
        this.setState({
          scores: data
        });

        console.log(data);
      })

      .catch(console.log);
  }

  render() {
    const { scores } = this.state;

    return (
      <div>
        <table className="table">
          <ScoreHeader />

          <ScoreBody scoreData={scores} />
        </table>
      </div>
    );
  }
}
