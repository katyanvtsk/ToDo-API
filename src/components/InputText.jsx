import { useState, memo } from "react";

import useAuth from "../hooks/useAuth.jsx";
import "../styles/base.css";
import "../styles/inputText.css";

const InputText = ({ tasks, setTasks }) => {
  console.log("render InputText");
  const { token } = useAuth();
  const [text, setText] = useState("");
  const [textError, setTextError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);

    if (value.trim().length > 0) {
      setTextError(false);
    }
  };

  const addTask = async () => {
    if (text.trim().length === 0) {
      setTextError(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: text }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        setTasks([...tasks, data]);
        setText("");
        setTextError(false);
      } else {
        throw new Error(`задача не создана, error status: ${response.status}`);
      }
    } catch (error) {
      console.log("Не удалось создать задачу...", error);
    }
    setIsLoading(false);
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

      {isLoading && <p>Загрузка...</p>}
      {textError && <p className="errorText">❌ Введите задачу!</p>}
    </div>
  );
};

export default memo(InputText);
