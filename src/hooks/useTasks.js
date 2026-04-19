import { useMutation, useQueryClient } from "@tanstack/react-query";
import { change } from "../redux/slices/inputTextSlice";
import { apiTodo } from "../server/apiTodo";
import { useDispatch } from "react-redux";

export const useAddTask = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (title) => apiTodo.addTask(title),
    onSuccess: () => {
      console.log("задача создана");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      dispatch(change(""));
    },
    onError: (error) => {
      console.error("Ошибка добавления:", error.message);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => apiTodo.deleteTask(id),
    onSuccess: () => {
      console.log("задача удалена");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Ошибка удаления:", error.message);
    },
  });
};

export const useDoneCheck = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => apiTodo.isDoneCheck(id),
    onSuccess: () => {
      console.log("задача выполнена");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Ошибка выполнения:", error.message);
    },
  });
};

export const useEditTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, title }) => apiTodo.editTask(id, title),
    onSuccess: () => {
      console.log("задача изменена");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Ошибка изменения:", error.message);
    },
  });
};

export const useClearTasks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tasks) => apiTodo.clearTasks(tasks),
    onSuccess: () => {
      console.log("задачи удалены");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Ошибка изменения:", error.message);
    },
  });
};
