import { useState, memo } from "react";

const Task = ({ task, deleteTask, isDoneCheck, editTask }) => {
  console.log("render Task");

  const [isEdit, setIsEdit] = useState(false);
  const [textEdit, setTextEdit] = useState(task.title);
  const [error, setError] = useState(false);

  const handleSave = () => {
    const trimText = textEdit.trim();
    if (!trimText) {
      setError(!trimText);
      return;
    }
    if (trimText !== task.title) {
      editTask(task.id, trimText);
    }
    setIsEdit(!isEdit);
    setError(!trimText);
  };

  const handleCancel = () => {
    setTextEdit(task.title);
    setIsEdit(!isEdit);
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleMain = () => {
    if (isEdit) {
      handleSave();
    } else {
      setIsEdit(!isEdit);
    }
  };

  return (
    <div className="task">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => isDoneCheck(task.id)}
      />

      {isEdit ? (
        <input
          value={textEdit}
          onChange={(e) => setTextEdit(e.target.value)}
          onKeyDown={handleKeydown}
        />
      ) : (
        <p className={task.isCompleted ? "done" : ""}>{task.title}</p>
      )}

      <button onClick={handleMain}>{isEdit ? "💾" : "✏️"}</button>
      <button onClick={() => deleteTask(task.id)}>🗑️</button>

      {error && <p className="errorText">❌ Название не может быть пустым!</p>}
    </div>
  );
};

export default memo(Task);
