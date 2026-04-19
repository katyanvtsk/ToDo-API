import { useState, memo } from "react";
import "../styles/base.css";
import "../styles/inputText.css";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../redux/slices/inputTextSlice.js";
import { useAddTask } from "../hooks/useTasks.js";

const InputText = () => {
  const text = useSelector((store) => store.inputText.text);
  const dispatch = useDispatch();

  const [textError, setTextError] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(change(value));

    if (value.trim().length > 0) {
      setTextError(false);
    }
  };

  const addMutation = useAddTask();
  const { isPending, isError, error } = addMutation;
  const addTask = async () => {
    const trimText = text.trim();

    if (!trimText) {
      setTextError(true);
      return;
    }
    addMutation.mutate(trimText);
  };

  const handleClick = () => {
    addTask();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="inputText">
      <div className="inputText__wrapper">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Введите задачу"
          onKeyDown={handleKeyDown}
          className="inputText__input"
        />
        <button onClick={handleClick} className="button button__inputText">
          Добавить
        </button>
      </div>
      {isPending && <p>Добавление задачи...</p>}
      {isError && <p>{error.message}</p>}
      {textError && <p className="errorText">❌ Введите задачу!</p>}
    </div>
  );
};

export default memo(InputText);
