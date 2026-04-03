import { useState, memo } from "react";
import Task from "./Task";
import "../styles/base.css";
import "../styles/taskList.css";

const TodoList = ({ tasks = [], deleteTask, isDoneCheck, editTask }) => {
  console.log("render TodoList");

  const [filter, setFilter] = useState("all"); //all, active, completed

  const filteredTask = tasks.filter((item) => {
    if (filter === "active") {
      return !item.isDone;
    } else if (filter === "completed") {
      return item.isDone;
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
          onClick={() => setFilter("all")}
        >
          Все
        </button>
        <button
          className={`button__active ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Активные
        </button>
        <button
          className={`button__completed ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Завершённые
        </button>
      </div>
    </div>
  );
};

export default memo(TodoList);
