import { memo } from "react";
import { useClearTasks } from "../hooks/useTasks.js";

const CountTask = ({ tasks }) => {
  console.log("render CountTask");

  const clearMutation = useClearTasks();
  const clearTasks = () => {
    clearMutation.mutate(tasks);
  };

  const notIsDone = tasks.filter((item) => !item.isCompleted);
  const count = notIsDone.length;

  return (
    <div className="count-container">
      <p>Осталось выполнить: {count}</p>
      <button onClick={clearTasks}>Очистить выполненные</button>
    </div>
  );
};

export default memo(CountTask);
