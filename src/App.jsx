import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import InputText from "./components/InputText.jsx";
import TodoList from "./components/TodoList.jsx";
import CountTask from "./components/CountTask.jsx";
import { Route, Routes, Link } from "react-router";
import RegistrationForm from "./components/RegistrationForm.jsx";
import Login from "./components/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { apiTodo } from "./server/apiTodo.js";
import "./styles/App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const getTasks = useCallback(async () => {
    try {
      const data = await apiTodo.getTasks();
      setTasks(data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      const res = await apiTodo.deleteTask(id);
      if (res) {
        setTasks((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const isDoneCheck = useCallback(async (id) => {
    try {
      const res = await apiTodo.isDoneCheck(id);

      if (res) {
        console.log("чек на сервере");

        setTasks((tasks) =>
          tasks.map((item) => {
            if (item.id == id) {
              return { ...item, isDone: !item.isDone };
            }
            return { ...item };
          }),
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const editTask = useCallback(async (id, newTitle) => {
    try {
      const res = await apiTodo.editTask(id, newTitle);

      if (res) {
        console.log("меняем таску");

        setTasks((tasks) =>
          tasks.map((item) => {
            if (item.id === id) {
              return { ...item, title: newTitle };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const clearTasks = useCallback(async () => {
    const res = await apiTodo.clearTasks(tasks);
    console.log("удалены:", res);
    setTasks(tasks.filter((task) => !task.isDone));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <div>
                <Header />
                <InputText tasks={tasks} setTasks={setTasks} />
                <TodoList
                  tasks={tasks}
                  deleteTask={deleteTask}
                  isDoneCheck={isDoneCheck}
                  editTask={editTask}
                />
                <CountTask tasks={tasks} clearTasks={clearTasks} />
              </div>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

//"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthdHlhQGdtYWlsLmNvbSIsImlkIjoyMzg1LCJpYXQiOjE3NzQ4NzMzNTV9.ODiDsMqi-rlszCmPUsHdyYWpfErCfeOraMQQzI7U5vA"
