import React, { Component } from "react";
// import { Mine, TileStateEnum } from "./Core";
import "./Tile.css";

export const TileComponent = props => {
  const { tile, row, col, field, handleChange } = props;

  const tileStylePuzzle = {
    color: tile.value !== field.numberCount+1 ? "blue" : "transparent",
    backgroundColor: tile.value !== field.numberCount+1 ? "white" : "lightblue"
  };

  return (
    <td className="colStylePuzzle">
      <button
        className={"tileStylePuzzle"}
        style={tileStylePuzzle}
        onClick={() => handleChange(row, col)}
      >
        <span>{tile.value}</span>
      </button>
    </td>
  );
};
