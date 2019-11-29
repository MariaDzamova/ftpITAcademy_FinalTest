import React, { Component } from "react";
import Score from "./Score";

export class ScoreList extends Component {
  state = {
    score: []
  };

  componentDidMount() {
    console.log("UPDATING");

    fetch("localhost:3300/api/scores")
      .then(res => res.json())

      .then(data => {
        this.setState({
          score: data
        });
        console.log(data);
      })
      .catch(console.log);
  }

  render() {
    return (
      <div>
        <h1>Minesweeper Scores</h1>
        <Score className="Table" scoreData={this.state.score} />
      </div>
    );
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

export default ScoreList;

// -------------------- OLD VERSION ---------------

// import React, { Component } from "react";

// const ScoreHeader = () => {
//   return (
//     <thead style={{ fontWeight: "bold" }}>
//       <tr>
//         <th scope="col">Points</th>
//         <th scope="col">Player</th>
//         <th scope="col">Date</th>
//       </tr>
//     </thead>
//   );
// };

// const ScoreBody = ({ scoreData }) => {
//   const rows = scoreData.map((score, index) => (
//     <tr className="character-table-row" key={index}>
//       <td>{score.points}</td>
//       <td>{score.player}</td>
//       <td>{score.date}</td>
//     </tr>
//   ));

//   return <tbody>{rows}</tbody>;
// };

// export class ScoreList extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       scores: [
//         { date: "20.11.2019", player: "Player1", points: 100 },
//         { date: "22.11.2019", player: "Player2", points: 58 },
//         { date: "21.11.2019", player: "Player3", points: 67 },
//         { date: "25.11.2019", player: "Player4", points: 102 }
//       ]
//     };
//   }

//   render() {
//     const { scores } = this.state;

//     return (
//       <div>
//         <table className="table">
//           <ScoreHeader />
//           <ScoreBody scoreData={scores} />
//         </table>
//       </div>
//     );
//   }
// }

// export default ScoreList;
