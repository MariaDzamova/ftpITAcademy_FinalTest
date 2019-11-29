import React from "react";
import { TileComponent } from "./Tile";

export default function FieldComponent(props) {
  const field = props.field;
  const rows = field.field.map((row, r) => {
    const cols = row.map((tile, c) => {
      return (
        <TileComponent
          key={"c" + c}
          tile={tile}
          row={r}
          col={c}
          handleOpen={props.handleOpen}
          handleMark={props.handleMark}
        />
      );
    });
    return <tr key={"r" + r}>{cols}</tr>;
  });
  return (
    <table>
      <tbody>{rows}</tbody>
    </table>
  );
}
