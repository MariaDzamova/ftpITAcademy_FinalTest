import React from "react";
import { GameStateEnum } from "./Core";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function GameStateComponent({ gameState, handleNewGame, rowCount, colCount }) {
  let title = null;
  const history = useHistory();
  const match = useRouteMatch();

  switch (gameState) {
    case GameStateEnum.WON:
      title = <h1>You WON!</h1>;
      break;

    case GameStateEnum.PLAYING:
      break;

    default:
      break;
  }

  if (title)
    return (
      <div>
        {title}
        <button className="btn btn-primary" onClick={() => handleNewGame(rowCount,colCount)}>
          New game
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => {
            history.push(`${match.url}/rating-form`);
          }}
        >
          Rate Game!
        </button>
      </div>
    );
  else return null;
}
