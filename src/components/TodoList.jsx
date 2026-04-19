import { useState, memo } from "react";
import Task from "./Task";
import "../styles/base.css";
import "../styles/taskList.css";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter, setFilter } from "../redux/slices/filterSlice";

const TodoList = ({ tasks, deleteTask, editTask, isDoneCheck }) => {
  console.log("render TodoList");

  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const filteredTask = tasks.filter((item) => {
    if (filter === "active") {
      return !item.isCompleted;
    } else if (filter === "completed") {
      return item.isCompleted;
    }
    return true;
  });

  return (
    <div className="tasks-list">
      {filteredTask.map((item) => (
        <Task
          key={item.id}
          task={item}
          deleteTask={deleteTask}
          isDoneCheck={isDoneCheck}
          editTask={editTask}
        />
      ))}

      <div className="button-list">
        <button
          className={`button__all ${filter === "all" ? "active" : ""}`}
          onClick={() => dispatch(setFilter("all"))}
        >
          Все
        </button>
        <button
          className={`button__active ${filter === "active" ? "active" : ""}`}
          onClick={() => dispatch(setFilter("active"))}
        >
          Активные
        </button>
        <button
          className={`button__completed ${filter === "completed" ? "active" : ""}`}
          onClick={() => dispatch(setFilter("completed"))}
        >
          Завершённые
        </button>
      </div>
    </div>
  );
};

export default memo(TodoList);
