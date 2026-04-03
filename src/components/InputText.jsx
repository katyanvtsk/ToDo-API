import { useState, memo } from "react";
import "../styles/base.css";
import "../styles/inputText.css";

const InputText = ({ tasks, setTasks }) => {
  console.log("render InputText");
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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthdHlhQGdtYWlsLmNvbSIsImlkIjoyMzg1LCJpYXQiOjE3NzQ4NzMzNTV9.ODiDsMqi-rlszCmPUsHdyYWpfErCfeOraMQQzI7U5vA",
          },
          body: JSON.stringify({
            title: text,
          }),
        },
      );

      const data = await response.json();
      setTasks([...tasks, data]);
      console.log(tasks);

      setText("");
      setTextError(false);
    } catch (error) {
      console.log("Не удалось загрузить задачу...", error);
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
