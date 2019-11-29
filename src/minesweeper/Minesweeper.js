import React, { Component } from "react";
import FieldComponent from "./FieldComponent";
import GameStateComponent from "./GameState";
import { Field, GameStateEnum } from "./Core";
import { Switch, Route, withRouter } from "react-router-dom";
import Score from "./Score";
import Comments from "./Comments";
import CommentsForm from "./CommentsForm";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Minesweeper extends Component {
  constructor(props) {
    super(props);

    const field = new Field(10, 10, 1);

    this.state = {
      field: field
    };
  }

  render() {
    const { field } = this.state;
    const { match } = this.props;
    return (
      <div>
        <GameStateComponent
          gameState={field.gameState}
          handleNewGame={this.handleNewGame}
        />

        <Switch>
          <Route path={`${match.url}/commentform`}>
            <div>
              <h1>Add comment</h1>
              <CommentsForm
              // submitHandler={this.submitHandler}
              // cancelHandler={this.cancelHandler}
              />
            </div>
          </Route>
          <Route path={`${match.url}/scores`}>
            <div>
              <h1>Scores</h1>
              <Score />
            </div>
          </Route>
          <Route path={`${match.url}`}>
            <FieldComponent
              field={field}
              handleOpen={this.handleOpen}
              handleMark={this.handleMark}
            />
            <br></br>
            <br></br>
            <button
              className="btn btn-primary"
              onClick={event => {
                event.stopPropagation();
                // this.commentFormHandler();
                this.urlHandler();
              }}
            >
              {" "}
              Add comment
            </button>
            <Comments />
          </Route>
        </Switch>
      </div>
    );
  }

  urlHandler = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/commentform`);
  };

  commentFormHandler = () => {
    this.setState({});
  };
  showScoreHandler = () => {
    const { score } = this.state;
    this.setState({
      score: score
    });
  };

  handleOpen = (row, col) => {
    const { field } = this.state;
    field.openTile(row, col);
    this.setState({
      field: field
    });
    if (field.gameState === GameStateEnum.WON) {
      this.addPlayer();
      this.showScores();
    }
  };

  handleNewGame = () => {
    const { history, match } = this.props;
    this.setState({ field: new Field(10, 10, 1) });
    history.push(`${match.url}/`);
  };

  showScores() {
    const { history, match } = this.props;
    history.push(`${match.url}/scores`);
  }

  addPlayer() {
    fetch("http://localhost:3300/api/scores", {
      method: "POST",
      body: JSON.stringify({
        player: "majka",
        points: Math.floor(Math.random() * 99 + 1)
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => this.showScores());
  }

  handleMark = (row, col) => {
    const { field } = this.state;
    field.markTile(row, col);
    this.setState({
      field: field
    });
  };
}

export default withRouter(Minesweeper);
