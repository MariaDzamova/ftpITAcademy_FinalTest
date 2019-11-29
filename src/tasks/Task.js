import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Task(props) {
  const { task, showDetail, editHandler, finishHandler } = props;

  return (
    <li
      onClick={() => showDetail(task)}
      className={
        !task.finished
          ? "list-group-item"
          : "list-group-item list-group-item-success"
      }
    >
      <div className="d-flex flex-row">
        <div className="flex-fill">
          {task.id + 1}. {task.text}
        </div>
        <Link to={"/tasks/edit-form"}>
        <button
          className="btn btn-secondary"
          onClick={event => {
            event.stopPropagation();
            editHandler(task);
          }}
        >
          Edit
        </button>
        </Link>
        {!task.finished ? (
          <button
            className="btn btn-secondary"
            onClick={event => {
              event.stopPropagation();
              finishHandler(task);
            }}
          >
            Finish task
          </button>
        ) : null}
      </div>
    </li>
  );
}
