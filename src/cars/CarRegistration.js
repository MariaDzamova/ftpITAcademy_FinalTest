import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Cars from "./Cars";
import FormNew from "./FormNew";
import { BrowserRouter as Router, Link } from "react-router-dom";

class CarRegistration extends Component {
  state = {
    cars: [],
    clickedCar: null,
    editedCar: null
  };
  componentDidMount() {
    console.log(">>>AFTER DISPLAYING THE Characters COMPONENT<<<");
    fetch("http://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        this.setState({
          characters: data.map(e => {
            return {
              brand: e.brand,
              spz: e.spz
            };
          })
        });
        console.log(data);
      })
      .catch(console.log);
  }

  componentWillUnmount() {
    console.log(">>>BEFORE DISSAPEARING THE Characters COMPONENT<<<");
  }

  render() {
    const { match } = this.props;
    const { cars, clickedCar, editedCar } = this.state
    return (
      <div>
        <Switch>
          <Route path={`${match.url}/form-new`}>
            <div>
              <h1>Add car</h1>
              <FormNew
              // submitHandler={this.submitHandler}
              // cancelHandler={this.cancelHandler}
              />
            </div>
          </Route>
          <Route path={`${match.url}/form-edit`}>
            <div>
              <h1>Edit car</h1>
              {/* <FormEdit/> */}
            </div>
          </Route>
          <Route path={`${match.url}`}>
            <div>
              <h1>Cars in database</h1>
              <button
                className="btn btn-primary"
                onClick={event => {
                  event.stopPropagation();
                  this.urlHandlerNew();
                }}
              >
                {" "}
                Register new car
              </button>
            </div>

            <Cars
              car={clickedCar}
              handleDelete={this.removeCar}
              handleEdit={this.removeCar}
            />
          </Route>
        </Switch>
      </div>
    );
  }

  urlHandlerNew = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/form-new`);
  };

  removeCar = index => {
    const { cars } = this.state;

    this.setState({
      cars: cars.filter((car, i) => {
        return i !== index;
      })
    });
  };

  //   commentFormHandler = () => {
  //     this.setState({});
  //   };
  //   showScoreHandler = () => {
  //     const { score } = this.state;
  //     this.setState({
  //       score: score
  //     });
  //   };

  //   handleOpen = (row, col) => {
  //     const { field } = this.state;
  //     field.openTile(row, col);
  //     this.setState({
  //       field: field
  //     });
  //     if (field.gameState === GameStateEnum.WON) {
  //       this.addPlayer();
  //       this.showScores();
  //     }
  //   };

  //   handleNewGame = () => {
  //     const { history, match } = this.props;
  //     this.setState({ field: new Field(10, 10, 1) });
  //     history.push(`${match.url}/`);
  //   };

  //   showScores() {
  //     const { history, match } = this.props;
  //     history.push(`${match.url}/scores`);
  //   }

  //   addPlayer() {
  //     fetch("http://localhost:3300/api/scores", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         player: "majka",
  //         points: Math.floor(Math.random() * 99 + 1)
  //       }),
  //       headers: {
  //         "Content-type": "application/json"
  //       }
  //     })
  //       .then(response => response.json())
  //       .then(response => this.showScores());
  //   }

  //   handleMark = (row, col) => {
  //     const { field } = this.state;
  //     field.markTile(row, col);
  //     this.setState({
  //       field: field
  //     });
  //   };
}

export default withRouter(CarRegistration);
