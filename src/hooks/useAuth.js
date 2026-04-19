import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logIn } from "../server/apiTodo";
import { useNavigate } from "react-router";

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userData) => logIn.register(userData),
    onSuccess: () => {
      console.log("успешная регистрация");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Ошибка регистрации:", error.message);
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userData) => logIn.log(userData),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    },
    onError: (error) => {
      console.error("токен не получен", error.message);
    },
  });
};
