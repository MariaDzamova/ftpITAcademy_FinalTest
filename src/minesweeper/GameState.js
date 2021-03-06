import React from "react";
import { GameStateEnum } from "./Core";

export default function GameStateComponent({ gameState, handleNewGame }) {
  let title = null;

  switch (gameState) {
    case GameStateEnum.WON:
      title = <h1>You WON!</h1>;
      break;

    case GameStateEnum.LOST:
      title = <h1>You LOST!</h1>;
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
        <button className="btn btn-primary" onClick={() => handleNewGame()}>New game</button>
      </div>
    );
  else return null;
}
