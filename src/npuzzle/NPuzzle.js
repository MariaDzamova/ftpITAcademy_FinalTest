import React, { Component } from "react";
import FieldComponent from "./Field";
import GameStateComponent from "./GameState";
import FieldParamForm from "./FieldParamForm";
import RatingForm from "./RatingForm";
import Ratings from "./Ratings";
import { Field, GameStateEnum } from "./Core";
import { Switch, Route, withRouter } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";

class NPuzzle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      field: new Field(2,2),
      rowCount:2,
      colCount: 2
    };
  }

  render() {
    const { field } = this.state;
    const { history, match } = this.props;
    return (
      <div>
        <Switch>
          <Route path={`${match.url}/rating-form`}>
            <div>
              <h1>Add rating</h1>
              <RatingForm
                submitRateHandler={this.submitRateHandler}
                cancelRateHandler={this.cancelRateHandler}
              />
            </div>
          </Route>
          <Route path={`${match.url}/game-params`}>
            <div>
              <h1>Add rating</h1>
              <FieldParamForm
                submitHandler={this.submitHandler}
                cancelHandler={this.cancelHandler}

              />
            </div>
          </Route>
          <Route path={`${match.url}/`}>
            <h1>nPuzzle Game</h1>
            <button
              className="btn btn-primary "
              onClick={() => {
                history.push(`${match.url}/game-params`);
              }}
            >
              Set game field parameters
            </button>

            <GameStateComponent
              gameState={field.gameState}
              handleNewGame={this.handleNewGame}
              rowCount = {this.state.rowCount}
              colCount = {this.state.colCount}
            />
            <FieldComponent field={field} handleChange={this.handleChange} />
            <br></br>

            <button
              className="btn btn-primary"
              type="button"
              onClick={this.shuffleHandler}
            >
              Shuffle!
            </button>
            <br></br>
            <br></br>
            <Ratings />
          </Route>
        </Switch>
      </div>
    );
  }


  handleChange = (row, col) => {
    const { field } = this.state;
    field.changePosition(row, col);
    this.setState({
      field: field
    });
  };

  handleNewGame = (rows,cols) => {
    const { history, match } = this.props;
    this.setState({
      field: new Field(rows, cols)
    });
    history.push(`${match.url}`);
  };

  submitHandler = event => {
    const { rowCount, colCount} = this.state;
    const { history } = this.props;
 
    console.log(colCount);

    this.setState({
      field: new Field(rowCount, colCount)
    });
    history.goBack();
  };

  cancelHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  shuffleHandler = () => {
    const { field, rowCount, colCount } = this.state;
    this.setState({
      field: new Field(rowCount, colCount)
    });
  };

}

export default withRouter(NPuzzle);
