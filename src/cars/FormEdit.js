import React, { Component } from "react";

export default class CommentsForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = { player: "", comment: "" };

    this.state = this.initialState;
  }

  render() {
    const { player, comment } = this.state;

    const { submitHandler, cancelHandler } = this.props;

    return (
      <div>
        <form>
          <div className="form-group">
            <label>Player:</label>

            <input
              className="form-control"
              type="text"
              name="player"
              value={player}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Comment:</label>

            <input
              className="form-control"
              type="text"
              name="comment"
              value={comment}
              onChange={this.handleChange}
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
            onClick={() => cancelHandler()}
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
    this.showComments();
  };

  submitHandler = comment => {
    const { history, match } = this.props;

    fetch("http://localhost:3300/api/comments", {
      method: "POST",
      body: JSON.stringify({
        player: comment.player,
        comment: comment.comment
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => this.routeToMinesweeper());
  };

  routeToMinesweeper() {
    const { history, match } = this.props;
    history.push(`${match.url}`);
  }
}
