import Header from "./components/Header.jsx";
import InputText from "./components/InputText.jsx";
import TodoList from "./components/TodoList.jsx";
import CountTask from "./components/CountTask.jsx";
import { Route, Routes } from "react-router";
import RegistrationForm from "./components/RegistrationForm.jsx";
import Login from "./components/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { apiTodo } from "./server/apiTodo.js";
import "./styles/App.css";
import { useQuery } from "@tanstack/react-query";
import { useDeleteTask, useDoneCheck, useEditTask } from "./hooks/useTasks.js";

function App() {
  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: apiTodo.getTasks,
  });
  const deleteMutation = useDeleteTask();
  const doneMutation = useDoneCheck();
  const editMutation = useEditTask();

  const deleteTask = (id) => {
    deleteMutation.mutate(id);
  };

  const isDoneCheck = (id) => {
    doneMutation.mutate(id);
  };

  const editTask = (id, title) => {
    editMutation.mutate({ id, title });
  };

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
                <InputText />
                <TodoList
                  tasks={tasks}
                  deleteTask={deleteTask}
                  isDoneCheck={isDoneCheck}
                  editTask={editTask}
                />
                <CountTask tasks={tasks} />
              </div>
            }
          />
        </Route>
      </Routes>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
    </>
  );
}

export default App;

//"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthdHlhQGdtYWlsLmNvbSIsImlkIjoyMzg1LCJpYXQiOjE3NzQ4NzMzNTV9.ODiDsMqi-rlszCmPUsHdyYWpfErCfeOraMQQzI7U5vA"
