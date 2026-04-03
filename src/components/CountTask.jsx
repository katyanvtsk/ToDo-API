import { useState, memo } from "react";

const CountTask = ({ tasks, clearTasks }) => {
  console.log("render CountTask");
  const notIsDone = tasks.filter((item) => !item.isDone);
  const count = notIsDone.length;

  return (
    <div className="count-container">
      <p>Осталось выполнить: {count}</p>
      <button onClick={clearTasks}>Очистить выполненные</button>
    </div>
  );
};

export default memo(CountTask);
