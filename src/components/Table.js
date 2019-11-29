import React, { Component } from "react";

import { Link, useHistory } from "react-router-dom";

import "./Table.css";

const TableHeader = () => {
  return (
    <thead style={{ fontWeight: "bold" }}>
      <tr>
        <th scope="col">Name</th>

        <th scope="col">Job</th>

        <th scope="col">Action</th>
      </tr>
    </thead>
  );
};

// const TableBody = (props) => {

// const { charData, handleDelete } = props

const TableBody = ({ charData, handleDelete }) => {
  const history = useHistory();

  function handleClick(character) {
    history.push("/character/character-detail/" + character.name);
  }

  const rows = charData.map((character, index) => (
    <tr
      className="character-table-row"
      key={index}
      onClick={() => handleClick(character)}
    >
      <td>
        <Link to={"/character/character-detail/" + character.name}>
          {character.name}
        </Link>
      </td>

      <td>{character.job}</td>

      <td>
        <button
          className="btn btn-secondary"
          onClick={e => {
            e.stopPropagation();

            handleDelete(index);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return <tbody>{rows}</tbody>;
};

export default class Table extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log("should update in table");

    return true;
  }

  render() {
    const { charactersData, handleDelete } = this.props;

    return (
      <div>
        <table className="table">
          <TableHeader />

          <TableBody charData={charactersData} handleDelete={handleDelete} />
        </table>
      </div>
    );
  }
}

// --------------- OLD VERSION 2 ------------------

// import React, { Component } from "react";

// import { Link, useHistory } from "react-router-dom";

// import "./Table.css";

// const TableHeader = () => {
//   return (
//     <thead style={{ fontWeight: "bold" }}>
//       <tr>
//         <th scope="col">Name</th>
//         <th scope="col">Job</th>
//         <th scope="col">Action</th>
//       </tr>
//     </thead>
//   );
// };

// // const TableBody = (props) => {

// // const { charData, handleDelete } = props

// const TableBody = ({ charData, handleDelete }) => {
//   const history = useHistory();

//   function handleClick(character) {
//     history.push("/character/character-detail/" + character.name);
//   }

//   const rows = charData.map((character, index) => (
//     <tr
//       className="character-table-row"
//       key={index}
//       onClick={() => handleClick(character)}
//     >
//       <td>
//         <Link to={"/character/character-detail/" + character.name}>
//           {character.name}
//         </Link>
//       </td>

//       <td>{character.job}</td>

//       <td>
//         <button
//           className="btn btn-secondary"
//           onClick={() => handleDelete(index)}
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   ));

//   return <tbody>{rows}</tbody>;
// };

// export default class Table extends Component {
//   render() {
//     const { charactersData, handleDelete } = this.props;

//     return (
//       <div>
//         <table className="table">
//           <TableHeader />

//           <TableBody charData={charactersData} handleDelete={handleDelete} />
//         </table>
//       </div>
//     );
//   }
// }

//----------------- OLD VERSION ----------------------------

// import React, { Component } from "react";
// import { Clue, TileStateEnum, Mine } from "../minesweeper/Core";
// import { TileComponent } from "../minesweeper/Tile";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   NavLink,
//   Link
// } from "react-router-dom";

// const TableHeader = () => {
//   return (
//     <thead style={{ fontWeight: "bold" }}>
//       <tr>
//         <td scope="col">Name</td>
//         <td scope="col">Job</td>
//         <td scope="col">Action</td>
//       </tr>
//     </thead>
//   );
// };

// // const TableBody = (props) => {
// // const { charData, handleDelete } = props

// const TableBody = ({ charData, handleDelete }) => {
//   const rows = charData.map((character, index) => (
//     <tr key={index}>
//       <Link to="/table/character-detail">
//         <td>{character.name}</td>
//       </Link>
//       <td>{character.job}</td>

//       <td>
//         <button
//           className="btn btn-secondary"
//           onClick={() => handleDelete(index)}
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   ));

//   const tile1 = new Clue(4);
//   const tile2 = new Clue(4, TileStateEnum.CLOSED);
//   const mine = new Mine();
//   // return (
//   //   <tbody>
//   //     {rows}
//   //     <tr>
//   //       <TileComponent tile={tile1}/>
//   //       <TileComponent tile={tile2}/>
//   //       <TileComponent tile={mine}/>
//   //     </tr>
//   //   </tbody>
//   // );
//   return (
//     <tbody>
//       {rows}
//       {/* <tr>
//         <TileComponent tile={tile1}/>
//         <TileComponent tile={tile2}/>
//         <TileComponent tile={mine}/>
//       </tr>
//       <tr>
//         <TileComponent tile={tile1}/>
//         <TileComponent tile={tile2}/>
//         <TileComponent tile={mine}/>
//       </tr> */}
//     </tbody>
//   );
// };

// export default class Table extends Component {
//   render() {
//     const { charactersData, handleDelete } = this.props;

//     return (
//       <div>
//         <table className="table">
//           <TableHeader />
//           <TableBody charData={charactersData} handleDelete={handleDelete} />
//         </table>
//       </div>
//     );
//   }
// }
